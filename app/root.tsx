import { cssBundleHref } from "@remix-run/css-bundle";
import type { LinksFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import styles from "./tailwind.css";
import { createSupabaseServerClient } from "~/utils/supabase.server";
import type { LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useRevalidator, useLoaderData } from "@remix-run/react";
import { useEffect, useState } from "react";
import { createBrowserClient } from "@supabase/auth-helpers-remix";
import type { Database } from "~/data/supabase";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: styles },
  ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
];

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const env = {
    SUPABASE_URL: "https://kdorjywivwzfnyaanfbj.supabase.co",
    SUPABASE_ANON_KEY:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtkb3JqeXdpdnd6Zm55YWFuZmJqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDk3NDk4MDUsImV4cCI6MjAyNTMyNTgwNX0.J1Qcg_1Q7mMvMutPedY0LRI8RmlWs8Dbp2iljMgcudM",
  };

  const response = new Response();

  const supabase = createSupabaseServerClient({ request, response });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  return json({ env, session }, { headers: response.headers });
};

// export const loader = ({}: LoaderFunctionArgs) => {
//   const env = {
// SUPABASE_URL: "https://kdorjywivwzfnyaanfbj.supabase.co",
// SUPABASE_ANON_KEY:
//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtkb3JqeXdpdnd6Zm55YWFuZmJqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDk3NDk4MDUsImV4cCI6MjAyNTMyNTgwNX0.J1Qcg_1Q7mMvMutPedY0LRI8RmlWs8Dbp2iljMgcudM",
//   };

//   return json({ env });
// };

export default function App() {
  // const { env } = useLoaderData<typeof loader>();
  const { env, session } = useLoaderData<typeof loader>();
  // const [supabase] = useState(() =>
  //   createBrowserClient<Database>(env.SUPABASE_URL, env.SUPABASE_ANON_KEY)
  // );

  const { revalidate } = useRevalidator();

  const [supabase] = useState(() =>
    createBrowserClient(env.SUPABASE_URL, env.SUPABASE_ANON_KEY)
  );

  const serverAccessToken = session?.access_token;

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (session?.access_token !== serverAccessToken) {
        revalidate();
      }
    });
    return () => {
      subscription.unsubscribe();
    };
  }, [supabase.auth, serverAccessToken, revalidate]);

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet context={{ supabase, session }} />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

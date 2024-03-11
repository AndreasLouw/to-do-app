import {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  MetaFunction,
  json,
} from "@remix-run/node";
import { useOutletContext, useLoaderData } from "@remix-run/react";
import { OutletContext } from "~/types";
import { Login } from "~/components/custom/login";
import { Task } from "~/components/custom/to-do";
import { createSupabaseServerClient } from "~/utils/supabase.server";
import { TodoSchema } from "~/data/todo.dto";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const response = new Response();
  const supabase = createSupabaseServerClient({ request, response });
  const body = await request.formData();
  const title = body.get("title") as string;
  const label = body.get("label") as string;
  const priority = body.get("priority") as string;
  const status = body.get("status") as string;
  const id = body.get("id") as string;

  if (id !== null && status == null) {
    await supabase.from("tasks").delete().eq("id", id).select();
  } else if (status !== null) {
    await supabase
      .from("tasks")
      .update({
        title: title,
        label: label,
        priority: priority,
        status: status,
      })
      .eq("id", id)
      .select();
  } else {
    await supabase.from("tasks").insert({
      title: title,
      label: label,
      priority: priority,
      status: status,
    });
  }
  return json(null, { headers: response.headers });
};

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const response = new Response();
  const supabase = createSupabaseServerClient({ request, response });

  const { data, error } = await supabase.from("tasks").select("*");

  if (error) console.log("error", error);

  return json({ tasks: data ?? [] }, { headers: response.headers });
};

export default function Index() {
  const { session } = useOutletContext<OutletContext>();
  const { tasks } = useLoaderData<typeof loader>();
  return (
    <div className="container mx-auto h-screen">
      {!session?.user ? (
        <Login />
      ) : (
        <Task
          tasks={tasks as TodoSchema[]}
          userEmail={session.user.email!}
        ></Task>
      )}
    </div>
  );
}

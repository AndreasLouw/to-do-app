import { MetaFunction, redirect } from "@remix-run/node";

import { Link } from "@remix-run/react";
import { Button } from "~/components/ui/button";
import { useOutletContext } from "@remix-run/react";
import { OutletContext } from "~/types";

import { Login } from "~/components/custom/login";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  const { session } = useOutletContext<OutletContext>();

  // if (session?.user) {
  //   return redirect("/todo");
  // }

  return (
    <div className="container mx-auto md:w-[800px] h-screen">
      {!session?.user ? <Login /> : <Link to="/todo">To Do</Link>}
    </div>
  );
}

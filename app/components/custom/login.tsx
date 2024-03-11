import { useOutletContext } from "@remix-run/react";
import type { OutletContext } from "~/types";
import { Button } from "~/components/ui/button";

export const Login = () => {
  const { supabase } = useOutletContext<OutletContext>();

  const handleLogin = () => {
    supabase.auth.signInWithOAuth({
      provider: "google",
    });
  };

  return (
    <div className="flex h-full w-full items-center justify-center">
      <Button className="btn btn-primary btn-wide" onClick={handleLogin}>
        Login
      </Button>
    </div>
  );
};

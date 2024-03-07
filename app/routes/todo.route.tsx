import { Outlet } from "@remix-run/react";
import React from "react";

export default function TodoRoute() {
  return (
    <div>
      <Outlet />
    </div>
  );
}

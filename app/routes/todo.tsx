import { promises as fs } from "fs";
import path from "path";
import { Metadata } from "next";
// import Image from "next/image";

import { columns } from "~/components/custom/columns";
import { DataTable } from "~/components/custom/data-table";
import { UserNav } from "~/components/custom/user-nav";
import { TodoSchema } from "~/data/todo.dto";
import { Await, useLoaderData } from "@remix-run/react";
export const metadata: Metadata = {
  title: "Tasks",
  description: "A task and issue tracker build using Tanstack Table.",
};
import { TaskForm } from "~/components/custom/task-form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { Button } from "~/components/ui/button";
import type { ActionFunctionArgs } from "@remix-run/node";

// Simulate a database read for tasks.
async function getTasks() {
  const data = await fs.readFile(
    path.join(process.cwd(), "app/data/tasks.json")
  );

  const tasks = JSON.parse(data.toString());

  return tasks as TodoSchema[];
}

export function addTask(task: TodoSchema) {
  const tasks = []; //useLoaderData<typeof loader>();

  tasks.push(task);
  console.log(tasks);
  return tasks as TodoSchema[];
}

export async function loader() {
  const data = await fs.readFile(
    path.join(process.cwd(), "app/data/tasks.json")
  );

  const tasks = JSON.parse(data.toString());

  return tasks as TodoSchema[];
}

export async function action({ request }: ActionFunctionArgs) {
  const body = await request.formData();
  const name = body.get("title");
  console.log(name);

  const data = await fs.readFile(
    path.join(process.cwd(), "app/data/tasks.json")
  );

  const tasks = JSON.parse(data.toString());

  return tasks as TodoSchema[];
}

export default function TaskPage() {
  // const tasks = await getTasks();
  const tasks = useLoaderData<typeof loader>();

  return (
    <>
      <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
        <div className="flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Welcome back!</h2>
            <p className="text-muted-foreground">
              Here&apos;s a list of your tasks for this month!
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <UserNav />
          </div>
        </div>
        <DataTable data={tasks} columns={columns} />

        <div>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">Add Task</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Edit task</DialogTitle>
                <DialogDescription>
                  Make changes to the task here. Click submit when you're done.
                </DialogDescription>
              </DialogHeader>
              <TaskForm></TaskForm>
            </DialogContent>
          </Dialog>
        </div>

        {/* <Suspense fallback={<div>Loading...</div>}>
          <Await resolve={getTasks()}>
            {(resolvedValue) => (
              <DataTable data={resolvedValue} columns={columns} />
            )}
          </Await>
        </Suspense> */}
      </div>
    </>
  );
}

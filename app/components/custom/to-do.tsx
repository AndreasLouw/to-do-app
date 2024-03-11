import { Metadata } from "next";
import { columns } from "~/components/custom/columns";
import { DataTable } from "~/components/custom/data-table";
import { UserNav } from "~/components/custom/user-nav";
import { TodoSchema } from "~/data/todo.dto";
export const metadata: Metadata = {
  title: "Tasks",
  description: "A task and issue tracker build using Tanstack Table.",
};
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { Button } from "~/components/ui/button";
import { useEffect, useRef, useState } from "react";
import { Form, useOutletContext } from "@remix-run/react";
import { OutletContext } from "~/types";

interface TaskProps {
  tasks: TodoSchema[];
  userEmail: string;
}

export const Task = ({ tasks: serverTasks, userEmail: email }: TaskProps) => {
  const [tasks, setTasks] = useState(serverTasks);
  const [userEmail] = useState(email);

  const { supabase } = useOutletContext<OutletContext>();

  const formRef = useRef<HTMLFormElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const selectRef = useRef<HTMLSelectElement>(null);

  useEffect(() => {
    const channel = supabase
      .channel("*")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "tasks" },
        (payload) => {
          const newTask = payload.new as TodoSchema;
          console.log("new task in todo:", newTask);
          if (!tasks.find((task) => task.id === newTask.id)) {
            setTasks([...tasks, newTask]);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [tasks, supabase]);

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
              {/* <TaskForm
                tasks={tasks as TodoSchema[]}
                userEmail={userEmail}
              ></TaskForm> */}
              <Form
                method="post"
                ref={formRef}
                onSubmit={(e) => {
                  e.preventDefault();
                  formRef.current?.submit();
                  formRef.current?.reset();
                }}
              >
                <label htmlFor="title">Title: </label>
                <input
                  type="text"
                  placeholder="Type here"
                  className="input input-bordered w-full"
                  name="title"
                  ref={inputRef}
                />
                <br />
                <br />
                <label htmlFor="label">Label: </label>
                <select name="label" ref={selectRef}>
                  <option value="none" selected disabled hidden>
                    Select an Option
                  </option>
                  <option value="bug">Bug</option>
                  <option value="feature">Feature</option>
                  <option value="documentation">Documentation</option>
                </select>
                <br />
                <br />
                <label htmlFor="priority">Priority: </label>
                <select name="priority" ref={selectRef}>
                  <option value="none" selected disabled hidden>
                    Select an Option
                  </option>
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
                <br />
                <br />
                <label htmlFor="status">Status: </label>
                <select name="status" ref={selectRef}>
                  <option value="none" selected disabled hidden>
                    Select an Option
                  </option>
                  <option value="backlog">Backlog</option>
                  <option value="todo">Todo</option>
                  <option value="in progress">In Progress</option>
                  <option value="done">Done</option>
                  <option value="canceled">Canceled</option>
                </select>
                <br />
                <br />

                <Button type="submit">Add Task</Button>
              </Form>
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
};

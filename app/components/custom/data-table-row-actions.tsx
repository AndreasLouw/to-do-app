import { Row } from "@tanstack/react-table";

import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { TodoSchema } from "~/data/todo.dto";
import { Form } from "@remix-run/react";
import { useRef } from "react";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

import { TaskForm } from "~/components/custom/task-form";

export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  const task = row.original as TodoSchema;
  const formRef = useRef<HTMLFormElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const selectRef = useRef<HTMLSelectElement>(null);

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">Edit</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit task</DialogTitle>
            <DialogDescription>
              Make changes to the task here. Click submit when you're done.
            </DialogDescription>
          </DialogHeader>
          {/* <TaskForm></TaskForm> */}
          <Form
            method="post"
            ref={formRef}
            onSubmit={(e) => {
              e.preventDefault();
              formRef.current?.submit();
              formRef.current?.reset();
            }}
          >
            <input
              type="text"
              hidden
              placeholder="Type here"
              className="input input-bordered w-full"
              name="id"
              ref={inputRef}
              defaultValue={task.id}
            />
            <label htmlFor="title">Title: </label>
            <input
              type="text"
              placeholder="Type here"
              className="input input-bordered w-full"
              name="title"
              ref={inputRef}
              defaultValue={task.title}
            />
            <br />
            <br />
            <label htmlFor="label">Label: </label>
            <select name="label" ref={selectRef} defaultValue={task.label}>
              <option value="bug">Bug</option>
              <option value="feature">Feature</option>
              <option value="documentation">Documentation</option>
            </select>
            <br />
            <br />
            <label htmlFor="priority">Priority: </label>
            <select
              name="priority"
              ref={selectRef}
              defaultValue={task.priority}
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
            <br />
            <br />
            <label htmlFor="status">Status: </label>
            <select name="status" ref={selectRef} defaultValue={task.status}>
              <option value="backlog">Backlog</option>
              <option value="todo">Todo</option>
              <option value="in progress">In Progress</option>
              <option value="done">Done</option>
              <option value="canceled">Canceled</option>
            </select>
            <br />
            <br />
            <Button type="submit">Update Task</Button>
          </Form>
        </DialogContent>
      </Dialog>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">Delete</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Delete task</DialogTitle>
            <DialogDescription>
              Do you want to delete this task?
            </DialogDescription>
          </DialogHeader>
          <Form
            method="post"
            ref={formRef}
            onSubmit={(e) => {
              e.preventDefault();
              formRef.current?.submit();
              formRef.current?.reset();
            }}
          >
            <input
              type="text"
              hidden
              placeholder="Type here"
              className="input input-bordered w-full"
              name="id"
              ref={inputRef}
              defaultValue={task.id}
            />
            <Button type="submit">Delete Task</Button>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
}

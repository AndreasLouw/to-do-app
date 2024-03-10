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

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

import { TaskForm } from "~/components/custom/task-form";

export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Edit Task</Button>
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
  );
}

import { Button } from "~/components/ui/button";
import { TodoSchema } from "~/data/todo.dto";
import { Input } from "~/components/ui/input";
import { useForm } from "react-hook-form";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "~/components/ui/command";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";

import { cn } from "~/lib/utils";

import { Check, ChevronsUpDown } from "lucide-react";

import { labels, priorities, statuses } from "~/data/data";
import { useEffect, useRef, useState } from "react";
import { OutletContext } from "~/types";
import { useOutletContext } from "@remix-run/react";

interface TaskProps {
  tasks: TodoSchema[];
  userEmail: string;
}

// import { addTask } from "~/routes/todo";

export function TaskForm({ tasks: serverTasks, userEmail: email }: TaskProps) {
  const form = useForm<TodoSchema>({
    defaultValues: {
      id: "",
      title: "",
      label: "",
      priority: "",
      status: "",
    },
  });

  const { supabase } = useOutletContext<OutletContext>();
  const [tasks, setTasks] = useState(serverTasks);

  // function onSubmit(values: TodoSchema) {
  //   console.log(values);
  //   // addTask(values);
  //   const channel = supabase
  //     .channel("*")
  //     .on(
  //       "postgres_changes",
  //       { event: "INSERT", schema: "public", table: "tasks" },
  //       (payload) => {
  //         const newTask = payload.new as TodoSchema;
  //         console.log("new task:", newTask);
  //         if (!tasks.find((task) => task.id === newTask.id)) {
  //           setTasks([...tasks, newTask]);
  //         }
  //       }
  //     )
  //     .subscribe();

  //   supabase.removeChannel(channel);
  // }

  return (
    <Form {...form}>
      <form method="post" className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormDescription>This is the task.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="label"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Label</FormLabel>
              <FormControl>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        role="combobox"
                        className={cn(
                          "w-[200px] justify-between",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value
                          ? labels.find(
                              (labels) => labels.value === field.value
                            )?.label
                          : "Select label"}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-[200px] p-0">
                    <Command>
                      <CommandInput placeholder="Search language..." />
                      <CommandEmpty>No label found.</CommandEmpty>
                      <CommandGroup>
                        {labels.map((label) => (
                          <CommandItem
                            value={label.value}
                            key={label.label}
                            onSelect={() => {
                              form.setValue("label", label.value);
                            }}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                label.value === field.value
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                            {label.label}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </Command>
                  </PopoverContent>
                </Popover>
              </FormControl>
              <FormDescription>This is the task label.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="priority"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Priority</FormLabel>
              <FormControl>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        role="combobox"
                        className={cn(
                          "w-[200px] justify-between",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value
                          ? priorities.find(
                              (priority) => priority.value === field.value
                            )?.label
                          : "Select priority"}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-[200px] p-0">
                    <Command>
                      <CommandInput placeholder="Search language..." />
                      <CommandEmpty>No priority found.</CommandEmpty>
                      <CommandGroup>
                        {priorities.map((priority) => (
                          <CommandItem
                            value={priority.value}
                            key={priority.label}
                            onSelect={() => {
                              form.setValue("priority", priority.value);
                            }}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                priority.value === field.value
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                            {priority.label}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </Command>
                  </PopoverContent>
                </Popover>
              </FormControl>
              <FormDescription>This is the task priority.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Status</FormLabel>
              <FormControl>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        role="combobox"
                        className={cn(
                          "w-[200px] justify-between",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value
                          ? statuses.find(
                              (status) => status.value === field.value
                            )?.label
                          : "Select priority"}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-[200px] p-0">
                    <Command>
                      <CommandInput placeholder="Search language..." />
                      <CommandEmpty>No status found.</CommandEmpty>
                      <CommandGroup>
                        {statuses.map((status) => (
                          <CommandItem
                            value={status.value}
                            key={status.label}
                            onSelect={() => {
                              form.setValue("status", status.value);
                            }}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                status.value === field.value
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                            {status.label}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </Command>
                  </PopoverContent>
                </Popover>
              </FormControl>
              <FormDescription>This is the task status.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}

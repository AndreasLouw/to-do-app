import { ToDo, columns } from "~/components/custom/columns";
import { DataTable } from "~/components/custom/data-table";

function getData(): ToDo[] {
  // Fetch data from your API here.
  return [
    {
      id: "728ed52f",
      title: "First",
      status: "In Progress",
      priority: "High",
    },
    {
      id: "TASK-7878",
      title:
        "Try to calculate the EXE feed, maybe it will index the multi-byte pixel!",
      status: "Backlog",
      priority: "Medium",
    },
    {
      id: "TASK-7839",
      title: "We need to bypass the neural TCP card!",
      status: "Todo",
      priority: "High",
    },
    {
      id: "TASK-5562",
      title:
        "The SAS interface is down, bypass the open-source pixel so we can back up the PNG bandwidth!",
      status: "Backlog",
      priority: "Medium",
    },
    {
      id: "TASK-7878",
      title:
        "Try to calculate the EXE feed, maybe it will index the multi-byte pixel!",
      status: "Backlog",
      priority: "Medium",
    },
    {
      id: "TASK-7839",
      title: "We need to bypass the neural TCP card!",
      status: "Todo",
      priority: "High",
    },
    {
      id: "TASK-5562",
      title:
        "The SAS interface is down, bypass the open-source pixel so we can back up the PNG bandwidth!",
      status: "Backlog",
      priority: "Medium",
    },
    {
      id: "TASK-7878",
      title:
        "Try to calculate the EXE feed, maybe it will index the multi-byte pixel!",
      status: "Backlog",
      priority: "Medium",
    },
    {
      id: "TASK-7839",
      title: "We need to bypass the neural TCP card!",
      status: "Todo",
      priority: "High",
    },
    {
      id: "TASK-5562",
      title:
        "The SAS interface is down, bypass the open-source pixel so we can back up the PNG bandwidth!",
      status: "Backlog",
      priority: "Medium",
    },
    {
      id: "TASK-7878",
      title:
        "Try to calculate the EXE feed, maybe it will index the multi-byte pixel!",
      status: "Backlog",
      priority: "Medium",
    },
    {
      id: "TASK-7839",
      title: "We need to bypass the neural TCP card!",
      status: "Todo",
      priority: "High",
    },
    {
      id: "TASK-5562",
      title:
        "The SAS interface is down, bypass the open-source pixel so we can back up the PNG bandwidth!",
      status: "Backlog",
      priority: "Medium",
    },
    {
      id: "TASK-7878",
      title:
        "Try to calculate the EXE feed, maybe it will index the multi-byte pixel!",
      status: "Backlog",
      priority: "Medium",
    },
    {
      id: "TASK-7839",
      title: "We need to bypass the neural TCP card!",
      status: "Todo",
      priority: "High",
    },
    {
      id: "TASK-5562",
      title:
        "The SAS interface is down, bypass the open-source pixel so we can back up the PNG bandwidth!",
      status: "Backlog",
      priority: "Medium",
    },
  ];
}

export default function DemoPage() {
  const data = getData();

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  );
}

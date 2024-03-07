import { LoaderFunction, json } from '@remix-run/node';

export let loader: LoaderFunction = async () => {
  const tasks = [
    { id: 1, text: 'Buy groceries' },
    { id: 2, text: 'Walk the dog' },
    // Add more tasks as needed
  ];

  return json({ tasks });
};
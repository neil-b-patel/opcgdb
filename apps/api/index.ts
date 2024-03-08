import express, { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';

// Define the path to the directory containing the JSON files
const dataDirectory = path.join(__dirname, 'data');

// Create an Express application
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Define the endpoint to get an item by ID
app.get('/api/card/:id', (req: Request, res: Response) => {
  const id = req.params.id;
  const item = getItemById(id);
  if (item) {
    res.json(item);
  } else {
    res.status(404).json({ error: 'Item not found' });
  }
});

// Define the endpoint to get items by number
app.get('/api/cards', (req: Request, res: Response) => {
  const number = req.query.number as string;
  const items = getItemsByNumber(number);
  if (items.length > 0) {
    res.json(items);
  } else {
    res.status(404).json({ error: 'Items not found' });
  }
});

// Define the endpoint to get items by filters
app.get('/api/cards/search', (req: Request, res: Response) => {
  const { set, color, name, cost } = req.query;
  if (!set && !color && !name) {
    return res.status(400).json({ error: 'At least one filter is required' });
  }
  const filteredItems = filterItems({ set, color, name, cost });
  res.json(filteredItems);
});

// Function to read JSON files and return an item by ID
function getItemById(id: string) {
  const files = fs.readdirSync(dataDirectory);
  for (const file of files) {
    const filePath = path.join(dataDirectory, file);
    const items = JSON.parse(fs.readFileSync(filePath, 'utf-8')) as any[];
    const item = items.find((item) => item.id === id);
    if (item) {
      return item;
    }
  }
  return null;
}

// Function to read JSON files and return items by number
function getItemsByNumber(number: string) {
  const files = fs.readdirSync(dataDirectory);
  const items: any[] = [];
  for (const file of files) {
    const filePath = path.join(dataDirectory, file);
    const fileItems = JSON.parse(fs.readFileSync(filePath, 'utf-8')) as any[];
    const matchingItems = fileItems.filter((item) => item.number === number);
    items.push(...matchingItems);
  }
  return items;
}

// Function to filter items by set, color, name, and cost
function filterItems({
  set,
  color,
  name,
  cost,
}: {
  set?: string;
  color?: string;
  name?: string;
  cost?: string;
}) {
  const files = fs.readdirSync(dataDirectory);
  const filteredItems: any[] = [];
  for (const file of files) {
    const filePath = path.join(dataDirectory, file);
    const fileItems = JSON.parse(fs.readFileSync(filePath, 'utf-8')) as any[];
    const matchingItems = fileItems.filter((item) => {
      return (
        (!set || item.set.includes(set)) &&
        (!color || item.color === color) &&
        (!name || item.name.toLowerCase().includes(name.toLowerCase())) &&
        (!cost || item.cost === cost)
      );
    });
    filteredItems.push(...matchingItems);
  }
  return filteredItems;
}

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

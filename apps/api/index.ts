import express, { Request, Response } from 'express';

// Create an Express application
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Define the endpoint to get an item by ID
app.get('/api/card/:id', (req: Request, res: Response) => {
  res.status(404).json({ error: 'Item not found' });
});

// Define the endpoint to get items by number
app.get('/api/cards', (req: Request, res: Response) => {
  const number = req.query.number as string;
  res.status(404).json({ error: `Items not found for ${number}` });
});

// Define the endpoint to get items by filters
app.get('/api/cards/search', (req: Request, res: Response) => {
  //const { set, color, name, cost } = req.query;
  res.status(404).json({ error: 'Items not found' });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

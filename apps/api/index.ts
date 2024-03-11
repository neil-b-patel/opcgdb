import express, { json } from 'express';

import routes from './endpoints/routes.js';

// Create an Express application
const app = express();

// Middleware to parse JSON bodies
app.use(json());

for (const route of routes) {
  app.get(route.path, route.handler);
}

// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

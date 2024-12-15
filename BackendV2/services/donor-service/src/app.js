import express from 'express';
import donorRoutes from './donor.route.js';

const app = express();
app.use(express.json());

// Use routes
app.use('/donor', donorRoutes);

export default app;
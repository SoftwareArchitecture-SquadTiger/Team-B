import express from 'express';
import charityRoutes from './charity.route.js';

const app = express();
app.use(express.json());

// Use routes
app.use('/charity', charityRoutes);

export default app;
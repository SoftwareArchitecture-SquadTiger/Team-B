import express from 'express';
import donorRoutes from './Routes/donor.route.js';
import charityRoutes from './Routes/charity.route.js';

const app = express();
app.use(express.json());

// Use routes
app.use('/donor', donorRoutes);
app.use('/charity', charityRoutes);

export default app;
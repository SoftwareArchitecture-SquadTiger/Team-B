import express from 'express';
import donorRoutes from './Routes/donor.route.js';
import charityRoutes from './Modules/Charity/charity.routes.js';

const app = express();
app.use(express.json());

// Use routes
app.use('/donor', donorRoutes);
app.use('/charities', charityRoutes);

export default app;

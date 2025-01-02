import 'dotenv/config';
import express from 'express';
import { startProducer } from './events/producer.js';
import { startConsumer } from './events/consumer.js';
const app = express();
app.use(express.json());

startProducer().then(() => console.log('Producer connected'));
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Auth service running on port ${PORT}`));

export default app;

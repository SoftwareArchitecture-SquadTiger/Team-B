import app from './app.js';
import "dotenv/config"
import { startConsumer } from './events/consumer.js';
import { startResponseConsumer } from './events/response.consumer.js';

const PORT = process.env.PORT;

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});

startConsumer().catch((error) => {
  console.error('Error starting consumer:', error);
});
startResponseConsumer().catch((error) => {
  console.error('Error starting response consumer:', error);
});
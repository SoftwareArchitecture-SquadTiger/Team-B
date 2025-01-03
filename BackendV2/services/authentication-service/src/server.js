import "dotenv/config"
import { startConsumer } from './events/consumer.js';
import { startResponseConsumer } from './events/response.consumer.js';
import { startProducer } from './events/producer.js';

startProducer().then(() => console.log('Producer connected'));

startConsumer().catch((error) => {
  console.error('Error starting consumer:', error);
});
startResponseConsumer().catch((error) => {
  console.error('Error starting response consumer:', error);
});
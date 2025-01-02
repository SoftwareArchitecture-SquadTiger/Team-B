// response.consumer.js
import { Kafka } from 'kafkajs';
import { resolvePendingRequest } from '../utils/requestHandler.js';

// Create a separate Kafka instance and consumer (different groupId)
const kafka = new Kafka({
  clientId: 'auth-service-response',
  brokers: ['localhost:9093'],
});

const responseConsumer = kafka.consumer({
  groupId: 'auth-service-response-group',
  heartbeatInterval: 3000,
});

async function startResponseConsumer() {
  // Connect this consumer
  await responseConsumer.connect();

  // Subscribe to donor-response and charity-response topics
  await responseConsumer.subscribe({ topic: 'donor-response', fromBeginning: false });
  await responseConsumer.subscribe({ topic: 'charity-response', fromBeginning: false });

  // Run the consumer loop
  await responseConsumer.run({
    eachMessage: async ({ topic, message }) => {
      const msg = JSON.parse(message.value.toString());
      const { correlationId, ...data } = msg;

      try {
        switch (topic) {
          case 'donor-response':
            console.log(`Processing donor response with id: ${correlationId}...`);
            resolvePendingRequest(correlationId, data);
            break;
          case 'charity-response':
            console.log(`Processing charity response with id: ${correlationId}...`);
            resolvePendingRequest(correlationId, data);
            break;
          default:
            console.warn(`Unknown topic: ${topic}`);
        }
      } catch (err) {
        console.error(`Error processing topic: ${topic}`, err);
      }
    },
  });
}

export { startResponseConsumer };

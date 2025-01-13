// response.consumer.js
import { Kafka } from 'kafkajs';
import { resolvePendingRequest } from '../utils/actionHandler.js';

// Create a separate Kafka instance and consumer (different groupId)
const kafka = new Kafka({
  clientId: 'auth-service-response',
  brokers: [process.env.KAFKA_BROKER],
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
        console.log(`Processing donor response with id: ${correlationId}...`);            
        resolvePendingRequest(correlationId, data);
      } catch (err) {
        console.error(`Error processing topic: ${topic}`, err);
      }
    },
  });
}

export { startResponseConsumer };

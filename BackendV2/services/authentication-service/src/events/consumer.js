import { Kafka } from 'kafkajs';
import { handleRegisterRequest, handleLoginRequest } from '../auth.service.js';

const kafka = new Kafka({
  clientId: 'auth-service',
  brokers: [process.env.KAFKA_BROKER || 'localhost:9092']
});

const consumer = kafka.consumer({ groupId: 'auth-service-group' });

async function startConsumer() {
  await consumer.connect();

  // Subscribe to login and register topics
  await consumer.subscribe({ topic: 'login-request', fromBeginning: false });
  await consumer.subscribe({ topic: 'register-request', fromBeginning: false });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      const msg = JSON.parse(message.value.toString());
      try {
        switch (topic) {
          case 'login-request':
            await handleLoginRequest(msg);
            break;
          case 'register-request':
            await handleRegisterRequest(msg);
            break;
          default:
            console.error(`No handler for topic: ${topic}`);
        }
      } catch (err) {
        console.error(`Error processing ${topic}:`, err);
      }
    }
  });
}

export { startConsumer };

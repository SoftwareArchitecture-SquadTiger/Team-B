import { Kafka } from 'kafkajs';
import { handleRegisterRequest, handleLoginRequest } from '../auth.service.js';

const kafka = new Kafka({
  clientId: 'auth-service',
  brokers: [process.env.KAFKA_BROKER || 'localhost:9092'],
});

const consumer = kafka.consumer({ groupId: 'auth-service-group' });

async function startConsumer() {
  await consumer.connect();

  // Subscribe to topics for login and register requests
  await consumer.subscribe({ topic: 'login-request', fromBeginning: false });
  await consumer.subscribe({ topic: 'register-request', fromBeginning: false });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      const msg = JSON.parse(message.value.toString());

      try {
        switch (topic) {
          case 'login-request':
            console.log('Processing login request...');
            await handleLoginRequest(msg); // Trigger login workflow
            console.log('Login request processed successfully.');
            break;

          case 'register-request':
            console.log('Processing register request...');
            await handleRegisterRequest(msg); // Trigger registration workflow
            console.log('Register request processed successfully.');
            break;

          default:
            console.error(`No handler defined for topic: ${topic}`);
        }
      } catch (err) {
        console.error(`Error processing topic: ${topic}`, err);
      }
    },
  });
}

export { startConsumer };

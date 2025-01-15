import { Kafka } from 'kafkajs';
import { handleRegisterRequest, handleLoginRequest } from '../service/auth.service.js';
import { resolvePendingRequest } from '../utils/requestHandler.js';
const kafka = new Kafka({
  clientId: 'auth-service',
  brokers: [process.env.KAFKA_BROKER], 
});

const consumer = kafka.consumer({ groupId: 'auth-service-group', heartbeatInterval: 3000,  
});

async function startConsumer() {
  await consumer.connect();

  // Subscribe to topics for login and register requests
  await consumer.subscribe({ topic: 'login-request', fromBeginning: false });
  await consumer.subscribe({ topic: 'register-request', fromBeginning: false });

  await consumer.run({
    eachMessage: async ({ topic, message }) => {
      const msg = JSON.parse(message.value.toString());
      const { correlationId, ...data } = msg; 
      try {
        switch (topic) {
          case 'login-request':
            console.log(`Processing login request with id: ${correlationId}...`);
            await handleLoginRequest({ correlationId, ...data }); 
            console.log('Login request processed successfully.');
            break;
          case 'register-request':
            console.log(`Processing register request with id: ${correlationId}...`);
            await handleRegisterRequest({ correlationId, ...data }); 
            console.log('Register request processed successfully.');
            break;
        }
      } catch (err) {
        console.error(`Error processing topic: ${topic}`, err);
      }
    },
  });
}

export { startConsumer };

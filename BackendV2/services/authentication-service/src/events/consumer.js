import { Kafka } from 'kafkajs';
import { handleEncryptResponse } from '../tokenService.js';
import { handleRegisterRequest, handleLoginRequest, finalizeTokenCreation } from '../messageHandler.js';

const kafka = new Kafka({
  clientId: 'auth-service',
  brokers: [process.env.KAFKA_BROKER || 'localhost:9092']
});

const consumer = kafka.consumer({ groupId: 'auth-service-group' });

async function startConsumer() {
  await consumer.connect();
  
  await consumer.subscribe({ topic: 'register-request', fromBeginning: false });
  await consumer.subscribe({ topic: 'login-request', fromBeginning: false });
  await consumer.subscribe({ topic: 'auth-request', fromBeginning: false });
  await consumer.subscribe({ topic: 'key-response', fromBeginning: false });
  await consumer.subscribe({ topic: 'encrypt-response', fromBeginning: false });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      const msg = JSON.parse(message.value.toString());
      try {
        switch (topic) {
          case 'register-request':
            await handleRegisterRequest(msg);
            break;
          case 'login-request':
            await handleLoginRequest(msg);
            break;
          case 'auth-request':
            await handleLoginRequest(msg);
            break;
          case 'key-response':
            await finalizeTokenCreation(msg);
            break;
          case 'encrypt-response':
            handleEncryptResponse(msg);
            break;
        }
      } catch (err) {
        console.error(`Error processing ${topic}:`, err);
      }
    }
  });
}

export { startConsumer };
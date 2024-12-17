const { Kafka } = require('kafkajs');
const { handleEncryptResponse } = require('../services/tokenService');
const { handleRegisterRequest, handleLoginRequest, finalizeTokenCreation } = require('../handlers/messageHandlers');

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
  await consumer.subscribe({ topic: 'encrypt-response', fromBeginning: false }); // New subscription

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
            await handleLoginRequest(msg); // Similar logic as login
            break;
          case 'key-response':
            await finalizeTokenCreation(msg);
            break;
          case 'encrypt-response':
            // { correlationId, jwe }
            handleEncryptResponse(msg);
            break;
        }
      } catch (err) {
        console.error(`Error processing ${topic}:`, err);
      }
    }
  });
}

module.exports = { startConsumer };

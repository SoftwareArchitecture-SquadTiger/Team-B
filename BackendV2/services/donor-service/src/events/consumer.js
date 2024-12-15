import { Kafka } from 'kafkajs';
import donorService from '../donor.service.js'; // Use the donor service for CRUD logic
import { produceMessage } from './producer.js';

const kafka = new Kafka({
  clientId: 'donor-service',
  brokers: ['kafka:9092'], // Update with your Kafka broker address
});

const consumer = kafka.consumer({ groupId: 'donor-group' });

const consumeMessages = async () => {
  await consumer.connect();
  await consumer.subscribe({ topic: 'donor-request', fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      const incomingMessage = JSON.parse(message.value.toString());
      console.log(`Received message: ${JSON.stringify(incomingMessage)}`);

      // Handle business logic based on the message type
      let response;
      try {
        switch (incomingMessage.action) {
          case 'GET_ALL':
            response = await donorService.getAllDonors();
            break;
          case 'GET_BY_ID':
            response = await donorService.getDonorById(incomingMessage.data.id);
            break;
          case 'ADD':
            response = await donorService.addDonor(incomingMessage.data);
            break;
          case 'UPDATE':
            response = await donorService.updateDonor(
              incomingMessage.data.id,
              incomingMessage.data.update
            );
            break;
          case 'DELETE':
            response = await donorService.deleteDonor(incomingMessage.data.id);
            break;
          default:
            throw new Error('Unknown action');
        }

        // Produce a success message back to Kafka
        await produceMessage({
          status: 'success',
          action: incomingMessage.action,
          data: response,
        });
      } catch (error) {
        console.error('Error processing message:', error);

        // Produce an error message back to Kafka
        await produceMessage('donor-response-topic', {
          status: 'error',
          action: incomingMessage.action,
          error: error.message,
        });
      }
    },
  });
};

export { consumeMessages };

import { Kafka } from 'kafkajs';
import { actionHandlers, defaultHandler } from '../utils/actionHandler.js';
import { withErrorHandling } from '../utils/withErrorHandling.js';
import { produceMessage } from './producer.js';

const kafka = new Kafka({
  clientId: 'donor-service',
  brokers: [process.env.KAFKA_BROKER],
});

const consumer = kafka.consumer({ groupId: 'donor-group' });

export const consumeMessages = async () => {
  await consumer.connect();
  await consumer.subscribe({ topic: 'donor-request', fromBeginning: true });

  console.log('Consumer is listening to messages on "donor-request"...');

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      const incomingMessage = JSON.parse(message.value.toString());
      console.log(`Received message: ${JSON.stringify(incomingMessage)}`);

      // Identify the action handler
      const actionHandler = actionHandlers[incomingMessage.action] || defaultHandler;

      // Process the request and handle errors
      const response = await withErrorHandling(actionHandler, incomingMessage.data);

      // Produce the response message back to Kafka
      await produceMessage('donor-response', JSON.parse(JSON.stringify({
        action: incomingMessage.action,
        ...response, // Spread the response to include status, data, or error
      })));
    },
  });
};

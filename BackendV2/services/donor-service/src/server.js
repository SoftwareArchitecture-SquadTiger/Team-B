import { consumeMessages } from './events/consumer.js';

const startService = async () => {
  try {
    console.log('Starting donor-service...');

    // Start Kafka consumer
    await consumeMessages();

    console.log('donor-service is running and consuming Kafka messages');
  } catch (error) {
    console.error('Error starting donor-service:', error);
    process.exit(1); // Exit the process if something goes wrong
  }
};

startService();

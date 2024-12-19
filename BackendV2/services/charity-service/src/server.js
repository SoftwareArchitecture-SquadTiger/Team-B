import "dotenv/config"
import { consumeMessages } from './events/consumer.js';

const startService = async () => {
  try {
    console.log('Starting charity-service...');

    // Start Kafka consumer
    await consumeMessages();

    console.log('charity-service is running and consuming Kafka messages');
  } catch (error) {
    console.error('Error starting charity-service:', error);
    process.exit(1); // Exit the process if something goes wrong
  }
};

startService();
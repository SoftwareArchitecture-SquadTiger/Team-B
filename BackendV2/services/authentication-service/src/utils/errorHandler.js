import { response } from 'express';
import { produceLoginResponse,produceRegisterResponse } from '../events/producer.js'; // Import your Kafka producer instance

/**
 * Handle error by sending failure message to Kafka response topic
 * @param {string} topic - The Kafka response topic
 * @param {string} correlationId - Correlation ID for tracking
 * @param {string} errorMessage - The error message to send
 */
export const handleServiceError = async (topic, correlationId, errorMessage) => {
  try {
    const failureMessage = {
      correlationId,
      status: 'error',
      error: errorMessage,
    };
    switch (topic) {
      case 'login-response':
        await produceLoginResponse('error',failureMessage);
        break;

      case 'register-response':
        await produceRegisterResponse('error',failureMessage);
        break;

      default:
        throw new Error(`Invalid topic: ${topic}`);
    }

    console.log(`Error notification sent to topic ${topic}:`, failureMessage);
  } catch (error) {
    console.error(`Failed to send error notification: ${error.message}`);
  }
};

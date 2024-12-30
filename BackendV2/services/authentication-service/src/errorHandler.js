import { response } from 'express';
import { producer } from './events/producer.js'; // Import your Kafka producer instance

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
      success: false,
      error: errorMessage,
    };

    await producer.send({
      topic: 'login-response',
      messages: [{ value: JSON.stringify(failureMessage) }],
    });

    console.log(`Error notification sent to topic ${topic}:`, failureMessage);
  } catch (error) {
    console.error(`Failed to send error notification: ${error.message}`);
  }
};

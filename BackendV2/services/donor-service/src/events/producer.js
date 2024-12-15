import { Kafka } from 'kafkajs';

// Initialize Kafka client
const kafka = new Kafka({
  clientId: 'donor-service',
  brokers: ['kafka:9092'], 
});

const producer = kafka.producer();

export const produceMessage = async (message) => {
  await producer.connect();
  try {
    await producer.send({
      topic: 'donor-response',
      messages: [{ value: JSON.stringify(message) }],
    });
    console.log('Message sent:', message);
  } catch (err) {
    console.error('Error sending message:', err);
  } finally {
    await producer.disconnect();
  }
};


import { Kafka } from 'kafkajs';
import "dotenv/config";

// Initialize Kafka client
const kafka = new Kafka({
  clientId: 'donor-service',
  brokers: [process.env.KAFKA_BROKER], 
});

const producer = kafka.producer();

export const produceMessage = async (topic, message) => {
  await producer.connect();
  try {
    await producer.send({
      topic: topic,
      messages: [{ value: JSON.stringify(message) }],
    });
    console.log(`Message sent to topic "${topic}":`, message);
  } finally {
    await producer.disconnect();
  }
};


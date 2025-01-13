import { Kafka } from 'kafkajs';
import "dotenv/config";

// Initialize Kafka client
const kafka = new Kafka({
  clientId: 'statistics-service',
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
    console.log(`Message sent to topic "${topic}":`, JSON.stringify(message, null, 2)); // Stringify here for better logging
  } finally {
    await producer.disconnect();
  }
};

const produceGetAllMessage = async (topic) => {
  const correlationId = uuidv4();
  const timeout = 20000; //The wait time for the response from kafka (20s)

  return new Promise(async (resolve, reject) => {
    const timeoutId = setTimeout(() => {
      deletePendingRequest(correlationId);
      reject(new Error(`Timeout: The consumer may not listening to Kafka`));
    }, timeout);
    addPendingRequest(correlationId, resolve, timeoutId);
    try {
      await producer.connect();
      await producer.send({
        topic: topic,
        messages: [
          {
            value: JSON.stringify({
              action: 'GET_ALL',
              correlationId: correlationId,
            }),
          },
        ],
      });    
    } catch (error) {
      console.log("there is an error, rejecting promise");
      deletePendingRequest(correlationId); // Clean up on failure by deleting the stored id
      reject(error); // Reject the promise if sending fails
    } finally {
      await producer.disconnect();
    }
  });
};



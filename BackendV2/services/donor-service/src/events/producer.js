const { Kafka } = require('kafkajs');

// Initialize Kafka client
const kafka = new Kafka({
  clientId: 'donor-service',
  brokers: ['localhost:9092'], // Update with your broker addresses
});

const producer = kafka.producer();

const produceMessage = async (message) => {
  await producer.connect();
  try {
    await producer.send({
      topic: 'donations',
      messages: [{ value: JSON.stringify(message) }],
    });
    console.log('Message sent:', message);
  } catch (err) {
    console.error('Error sending message:', err);
  } finally {
    await producer.disconnect();
  }
};

// test usage
// produceMessage({ donorId: '123', charityId: '456', amount: 100 });
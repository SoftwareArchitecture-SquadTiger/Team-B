const { Kafka } = require('kafkajs');

const kafka = new Kafka({
  clientId: 'producer-service',
  brokers: [process.env.KAFKA_BROKER],
});

const producer = kafka.producer();

const runProducer = async () => {
  await producer.connect();
  console.log('Producer connected to Kafka');

  setInterval(async () => {
    try {
      const message = { value: `Message at ${new Date().toISOString()}` };
      await producer.send({
        topic: 'test-topic',
        messages: [message],
      });
      console.log('Message sent:', message.value);
    } catch (error) {
      console.error('Error sending message:', error);
    }
  }, 3000); // Send a message every 3 seconds
};

runProducer().catch(console.error);

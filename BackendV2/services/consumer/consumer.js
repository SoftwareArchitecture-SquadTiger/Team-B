const { Kafka } = require('kafkajs');

const kafka = new Kafka({
  clientId: 'consumer-service',
  brokers: [process.env.KAFKA_BROKER], // Ensure this matches the Kafka broker
});

const consumer = kafka.consumer({ groupId: 'test-group', sessionTimeout: 30000 });

const run = async () => {
  await consumer.connect();
  console.log('Consumer connected to Kafka');

  // Subscribe to the topic
  await consumer.subscribe({ topic: 'test-topic', fromBeginning: true });

  // Process each message
  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      const prefix = `${topic}[${partition}] | ${message.offset} / ${message.timestamp}`;
      console.log(`${prefix} ${message.key ? message.key.toString() : 'null'}#${message.value.toString()}`);
    },
  });
};

run().catch((e) => console.error(`[example/consumer] ${e.message}`, e));

// Graceful shutdown
const errorTypes = ['unhandledRejection', 'uncaughtException'];
const signalTraps = ['SIGTERM', 'SIGINT', 'SIGUSR2'];

errorTypes.forEach((type) => {
  process.on(type, async (e) => {
    try {
      console.log(`process.on ${type}`);
      console.error(e);
      await consumer.disconnect();
      process.exit(0);
    } catch (_) {
      process.exit(1);
    }
  });
});

signalTraps.forEach((type) => {
  process.once(type, async () => {
    try {
      await consumer.disconnect();
    } finally {
      process.kill(process.pid, type);
    }
  });
});

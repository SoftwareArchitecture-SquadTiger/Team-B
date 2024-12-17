const { Kafka } = require('kafkajs');

const kafka = new Kafka({
  clientId: 'auth-service-producer',
  brokers: [process.env.KAFKA_BROKER || 'localhost:9092']
});
const producer = kafka.producer();

async function startProducer() {
  await producer.connect();
}

async function produceEncryptRequest(msg) {
  await producer.send({
    topic: 'encrypt-request',
    messages: [{ value: JSON.stringify(msg) }]
  });
}

// Other produce functions remain the same (produceAdminToken, etc.)

module.exports = {
  startProducer,
  produceEncryptRequest,
  // other produce functions...
};

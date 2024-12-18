import { Kafka } from 'kafkajs';

const kafka = new Kafka({
  clientId: 'auth-service-producer',
  brokers: [process.env.KAFKA_BROKER || 'localhost:9092']
});

const producer = kafka.producer();

async function startProducer() {
  await producer.connect();
}

/**
 * Produce a user-data-fetch-request message
 * @param {Object} msg - { correlationId, email, userType }
 */
async function produceUserDataFetchRequest(msg) {
  const topic = msg.userType === 'charity' ? 'charity-fetch' : 'donor-fetch';
  await producer.send({
    topic,
    messages: [{ value: JSON.stringify(msg) }]
  });
}

/**
 * Produce a user-data-save-request message
 * @param {Object} msg - { correlationId, userType, userData }
 */
async function produceUserDataSaveRequest(msg) {
  const topic = msg.userType === 'charity' ? 'charity-creation' : 'donor-creation';
  await producer.send({
    topic,
    messages: [{ value: JSON.stringify(msg) }],
  });
}
/**
 * Produce a user-data-save-request message
 * @param {Object} msg - { correlationId, userType, userData }
 */
async function produceLoginSuccess(msg) {
  await producer.send({
    topic: login-success,
    messages: [{ value: JSON.stringify(msg) }],
  });
}


export {
  startProducer,
  produceUserDataFetchRequest,
  produceUserDataSaveRequest,
  produceLoginSuccess,
};

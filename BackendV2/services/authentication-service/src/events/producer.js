import { Kafka } from 'kafkajs';

const kafka = new Kafka({
  clientId: 'auth-service-producer',
  brokers: ['localhost:9093'], // Use localhost, not kafka
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
  try {
    await producer.send({
      topic,
      messages: [{ value: JSON.stringify(msg) }],
    });
    console.log(`Message sent to topic '${topic}' with correlationId '${msg.correlationId}'`);
  } catch (error) {
    console.error(`Error sending message to topic '${topic}':`, error.message);
    throw error;
  }
}

/**
 * Produce a user-data-save-request message
 * @param {Object} msg - { correlationId, userType, userData }
 */
async function produceUserDataSaveRequest(msg) {
  const topic = register-response;
  try {
    await producer.send({
      topic,
      messages: [{ value: JSON.stringify(msg) }],
    });
    console.log(`Message sent to topic '${topic}' with correlationId '${msg.correlationId}'`);
  } catch (error) {
    console.error(`Error sending message to topic '${topic}':`, error.message);
    throw error;
  }
}

/**
 * Produce a login-success message
 * @param {Object} msg - { correlationId, jwe }
 */
async function produceLoginSuccess(msg) {
  const topic = 'login-response'; // Ensure this matches your topic configuration
  try {
    await producer.send({
      topic,
      messages: [{ value: JSON.stringify(msg) }],
    });
    console.log(`Login success message sent to topic '${topic}' with correlationId '${msg.correlationId}'`);
  } catch (error) {
    console.error(`Error sending login success message to topic '${topic}':`, error.message);
    throw error;
  }
}

export {
  startProducer,
  produceUserDataFetchRequest,
  produceUserDataSaveRequest,
  produceLoginSuccess,
};

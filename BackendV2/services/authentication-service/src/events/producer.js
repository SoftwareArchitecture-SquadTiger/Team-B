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
 * Produce a user-data-save-request message
 * @param {Object} msg - { correlationId, userType, userData }
 */
async function produceUserDataSaveRequest(msg) {
  try {
    // Validate the input
    if (!msg || !msg.correlationId || !msg.userType || !msg.userData) {
      throw new Error("Invalid message format. Ensure all fields are provided.");
    }

    // Determine the topic based on userType
    const topic = msg.userType === 'charity' ? 'charity-request' : 'donor-request';
    console.log("User Type:", msg.userType); // Debug userType
    console.log("Determined Topic:", topic); // Debug topic
    console.log("Message to send:", JSON.stringify(msg)); // Debug message

    if (!topic) {
      throw new Error("Unable to determine the topic. Check userType.");
    }

    // Send the message to the Kafka topic
    await producer.send({
      topic: topic,
      messages: [
        {
          value: JSON.stringify({
            action: 'ADD',
            correlationId: msg.correlationId,
            data: msg.userData,
          }),
        },
      ],
    });

    console.log(`Message sent successfully to topic: ${topic}`);
  } catch (error) {
    console.error("Error in produceUserDataSaveRequest:", error.message);
    throw error; // Re-throw the error for handling elsewhere
  }
}
/**
 * Produce a user-data-save-request message
 * @param {Object} msg - { correlationId, userType, userData }
 */
async function produceLoginSuccess(msg) {
  await producer.send({
    topic: 'login-response',
    messages: [{ value: JSON.stringify(msg) }],
  });
}

/**
 * Produce a user-data-save-request message
 * @param {Object} msg - { correlationId, userType, userData }
 */
async function produceRegisterSuccess(msg) {
  await producer.send({
    topic: 'register-response',
    messages: [{ value: JSON.stringify(msg) }],
  });
}

export {
  startProducer,
  produceUserDataSaveRequest,
  produceLoginSuccess,
  produceRegisterSuccess,
  producer,
};

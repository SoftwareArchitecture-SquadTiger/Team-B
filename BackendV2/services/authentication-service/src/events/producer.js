import { Kafka } from 'kafkajs';
import { v4 as uuidv4 } from "uuid";
import {addPendingRequest, deletePendingRequest} from "../utils/requestHandler.js";
const kafka = new Kafka({
  clientId: 'auth-service-producer',
  brokers: [process.env.KAFKA_BROKER], // Use localhost, not kafka
});

const producer = kafka.producer();

async function startProducer() {
  await producer.connect();
}
const produceSaveRequest = async (topic, message) => {
  const correlationId = uuidv4();
  const timeout = 20000; //The wait time for the response from kafka (20s)

  return new Promise(async (resolve, reject) => {
    const timeoutId = setTimeout(() => {
      deletePendingRequest(correlationId);
      reject(new Error(`Timeout: The consumer may not listening to Kafka`));
    }, timeout);
    console.log("2");
    addPendingRequest(correlationId, resolve, timeoutId);
    try {
      await producer.send({
        topic: topic,
        messages: [
          {
            value: JSON.stringify({
              action: 'ADD',
              correlationId: correlationId,
              data: message.userData,
            }),
          },
        ],
      });    
    console.log('3');} catch (error) {
      console.log("there is an error, rejecting promise");
      deletePendingRequest(correlationId); // Clean up on failure by deleting the stored id
      reject(error); // Reject the promise if sending fails
    }console.log('4');
  });
};

/**
 * Produce a user-data-save-request message
 * @param {Object} msg - { correlationId, userType, userData }
 */
async function produceLoginResponse(status, msg) {
  const messageWithStatus = {
    ...msg,
    status: status,
  };
  
  await producer.send({
    topic: 'login-response',
    messages: [
      { value: JSON.stringify(messageWithStatus) },
    ],
  });
}

/**
 * Produce a user-data-save-request message
 * @param {Object} msg - { correlationId, userType, userData }
 */
async function produceRegisterResponse(status ,msg) {
  const messageWithStatus = {
    ...msg,
    status: status,
  };
  
  await producer.send({
    topic: 'register-response',
    messages: [
      { value: JSON.stringify(messageWithStatus) },
    ],
  });
}

export {
  startProducer,
  produceLoginResponse,
  produceRegisterResponse,
  produceSaveRequest,
};

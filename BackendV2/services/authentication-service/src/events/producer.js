import { Kafka } from 'kafkajs';
import { v4 as uuidv4 } from "uuid";
import {addPendingRequest, deletePendingRequest} from "../utils/requestHandler.js";
const kafka = new Kafka({
  clientId: 'auth-service-producer',
  brokers: [process.env.KAFKA_BROKER], 
});

const producer = kafka.producer();

async function startProducer() {
  await producer.connect();
}

/**
 * Produce a user-data-save-request message
 * @param {Object} msg - { correlationId, userType, userData }
 */
const produceSaveRequest = async (topic, message) => {
  const correlationId = uuidv4();
  const timeout = 20000; 

  return new Promise(async (resolve, reject) => {
    const timeoutId = setTimeout(() => {
      deletePendingRequest(correlationId);
      reject(new Error(`Timeout: The consumer may not listening to Kafka`));
    }, timeout);
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
    } catch (error) {
      console.log("there is an error, rejecting promise");
      deletePendingRequest(correlationId);
      reject(error); 
    }
  });
};

/**
 * Produce a login-response
 * @param {Object} msg - { status, error }
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
 * Produce a register-response
 * @param {Object} msg - { status, error }
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

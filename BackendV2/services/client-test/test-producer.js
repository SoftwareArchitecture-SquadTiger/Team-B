import { Kafka } from "kafkajs";

const kafka = new Kafka({
    clientId: 'test-producer',
    brokers:['localhost:9093'],
});

const produceMessage = async () => {
    const producer = kafka.producer();
    await producer.connect();

    const message = {
        action: 'GET_ALL'
    };

    await producer.send({
        topic: 'donor-request',
        messages: [{ value: JSON.stringify(message) }]
    });

    console.log(`Message sent: ${message.action}`);
    await producer.disconnect();
};

produceMessage().catch((error) => {
    console.error(error);
});
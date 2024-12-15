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
        topic: 'client-topic',
        messages: [{ value: JSON.stringify(message) }]
    });

    console.log(`Message sent: ${message}`);
    await producer.disconnect();
};

produceMessage().catch((error) => {
    console.error(error);
});
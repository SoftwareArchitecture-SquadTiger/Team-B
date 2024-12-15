import { Kafka } from "kafkajs";

const kafka = new Kafka ({
    clientId: 'test-consumer',
    brokers: ['localhost:9093'],
});

const consumeMessages = async () => {
    const consumer = kafka.consumer({ groupId: 'test-group' });
    await consumer.connect();

    await consumer.subscribe({ topic: 'donor-response', fromBeginning: true });

    console.log(`Listening for message on: donor-response...`);

    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            console.log('Received message:', JSON.parse(message.value.toString()));
        },
    });
};

consumeMessages().catch((error) => {
    console.error(`Error consuming messages: ${error}`);
});
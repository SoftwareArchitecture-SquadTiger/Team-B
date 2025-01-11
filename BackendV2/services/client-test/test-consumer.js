import { Kafka } from "kafkajs";

const kafka = new Kafka({
    clientId: 'test-consumer',
    brokers: ['10.247.205.104:9093'],
});

const topic = 'statistics-response';

const consumeMessages = async () => {
    const consumer = kafka.consumer({ groupId: 'test-group' });
    await consumer.connect();

    await consumer.subscribe({ topic: `statistic-response`, fromBeginning: true });

    console.log(`Listening for messages on: ${topic}...`);

    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            // Parse the message value
            const parsedMessage = JSON.parse(message.value.toString());
            // Log the entire parsed message
            console.log('Received message:', JSON.stringify(parsedMessage, null, 2));
        },
    });
};

consumeMessages().catch((error) => {
    console.error(`Error consuming messages: ${error}`);
});

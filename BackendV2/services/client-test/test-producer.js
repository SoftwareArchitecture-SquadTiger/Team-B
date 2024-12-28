import { Kafka } from "kafkajs";

const kafka = new Kafka({
    clientId: 'test-producer',
    brokers:['localhost:9093'],
});

const produceMessage = async () => {
    const producer = kafka.producer();
    await producer.connect();

    const message = {
        id: '123123123123',
        userType:'Charity',
        email: 'test@gmail.com',
        password: 'password123',
    };

    await producer.send({
        topic: 'login-request',
        messages: [{ value: JSON.stringify(message) }]
    });

    console.log(`Message sent: ${message.userType}`);
    console.log(`Message sent: ${message.email}`);
    console.log(`Message sent: ${message.password}`);
    await producer.disconnect();
};

produceMessage().catch((error) => {
    console.error(error);
});
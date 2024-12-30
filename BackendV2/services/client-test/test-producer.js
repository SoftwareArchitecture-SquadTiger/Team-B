import { Kafka } from "kafkajs";

const kafka = new Kafka({
    clientId: 'test-producer',
    brokers:['localhost:9093'],
});

const produceMessage = async () => {
    const producer = kafka.producer();
    await producer.connect();

    const message ={
        "action": "ADD",
        "correlationId": "123e4567-e89b-12d3-a456-426614174000",
        "data": {
          "userType": "Charity",
          "email": "ter34reer@gmail.com",
          "password": "password123",
            "first_name": "John",
            "last_name": "Doe",
            "country": "USA",
            "phone": "1234567890",
        }
      };

    await producer.send({
        topic: 'register-request',
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
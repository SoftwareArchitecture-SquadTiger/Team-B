import { Kafka } from 'kafkajs';

const kafka = new Kafka({
    clientId: 'test-statistics-producer',
    brokers: ['10.247.205.104:9093'], // Ensure this matches the broker's advertised.listeners
  });

const produceTestMessages = async () => {
  const producer = kafka.producer();
  await producer.connect();

  // Test messages
  const messages = [
    {
    //   action: 'GET_TOTAL_DONATIONS_BY_DAY',
    //   correlationId: '123e4567-e89b-12d3-a456-426614174000',
    //   data: { startDate: '2025-01-01', endDate: '2025-01-20' },
    // },
    // {
    //   action: 'GET_TOTAL_DONATIONS_BY_DONOR',
    //   correlationId: '123e4567-e89b-12d3-a456-426614174001',
    //   data: { donorId: '8042f3db-20ad-4b8a-84fa-89987c72b9b8', queryParams: { year: 2023 } },
    // },
    // {
    //   action: 'GET_DONOR_LEADERBOARD',
    //   correlationId: '123e4567-e89b-12d3-a456-426614174002',
    //   data: {},
    // },
    // {
    //   action: 'GET_PROJECTS_BY_COUNTRY',
    //   correlationId: '123e4567-e89b-12d3-a456-426614174003',
    //   data: { queryParams: { year: 2025 } },
    // },
    // {
    //   action: 'GET_PROJECTS_BY_CATEGORY',
    //   correlationId: '123e4567-e89b-12d3-a456-426614174004',
    //   data: { queryParams: { category: 'Health' } },
    // },
    // {
    //   action: 'GET_TOTAL_DONATION_FOR_PROJECT',
    //   correlationId: '123e4567-e89b-12d3-a456-426614174005',
    //   data: { projectId: 'e123f5b0-d9a3-402c-b21c-4feabc2cde11' },
    // },
    // {
        action: 'GET_PROJECTS_BY_MONTH',
        correlationId: '123e4567-e89b-12d3-a456-426614174004', // Unique ID for tracking
        data: {
          startMonth: '2023-08', // Start month in YYYY-MM format
          endMonth: '2025-01',   // End month in YYYY-MM format
        },
    // },

    }];

  // Send messages
  for (const message of messages) {
    await producer.send({
      topic: 'statistics-request',
      messages: [{ value: JSON.stringify(message) }],
    });
    console.log(`Sent message: ${JSON.stringify(message)}`);
  }

  await producer.disconnect();
};

produceTestMessages().catch((error) => {
  console.error('Error producing messages:', error);
});

import express from 'express';
import { fetchAndUpdateDonations, fetchAndUpdateProjects } from './service/dataFetcher.js';
import { getLastUpdateTimestamp } from './utils/syncHandler.js';
import { consumeMessages } from './events/consumer.js';
import dotenv from 'dotenv';
const app = express();
const PORT = 3000;

const syncOnBoot = async () => {
  console.log('Performing boot-time synchronization...');

  const currentTime = new Date();
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);

  try {
    // Check the last sync timestamp for donations
    const lastDonationSync = await getLastUpdateTimestamp('donation_last_update');
    if (!lastDonationSync || lastDonationSync < yesterday) {
      console.log('Donation data is outdated. Fetching updates...');
      await fetchAndUpdateDonations();
    } else {
      console.log('Donation data is up-to-date.');
    }

    // Check the last sync timestamp for projects
    const lastProjectSync = await getLastUpdateTimestamp('project_last_update');
    if (!lastProjectSync || lastProjectSync < yesterday) {
      console.log('Project data is outdated. Fetching updates...');
      await fetchAndUpdateProjects(); // Ensure this function is implemented
    } else {
      console.log('Project data is up-to-date.');
    }

    console.log('Boot-time synchronization completed.');
  } catch (error) {
    console.error('Error during boot-time synchronization:', error.message);
  }
};

// Connect to MongoDB and start the server
const startServer = async () => {
  try {
    dotenv.config();
    // Perform boot-time synchronization
    await syncOnBoot();
    await consumeMessages();
    // Start the Express server
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Error starting the server:', error.message);
    process.exit(1);
  }
};

startServer();

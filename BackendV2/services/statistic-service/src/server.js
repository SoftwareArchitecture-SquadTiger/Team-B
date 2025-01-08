import express from 'express';
import mongoose from 'mongoose';
import { fetchAndUpdateDonations, fetchAndUpdateCharities } from './service/dataFetcher.js';
import { getLastUpdateTimestamp } from './utils/syncHandler.js';

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

    // Check the last sync timestamp for charities
    const lastCharitySync = await getLastUpdateTimestamp('charity_last_update');
    if (!lastCharitySync || lastCharitySync < yesterday) {
      console.log('Charity data is outdated. Fetching updates...');
      await fetchAndUpdateCharities();
    } else {
      console.log('Charity data is up-to-date.');
    }

    console.log('Boot-time synchronization completed.');
  } catch (error) {
    console.error('Error during boot-time synchronization:', error.message);
  }
};

// Connect to MongoDB and start the server
const startServer = async () => {
  try {
    // Perform boot-time synchronization
    await syncOnBoot();

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

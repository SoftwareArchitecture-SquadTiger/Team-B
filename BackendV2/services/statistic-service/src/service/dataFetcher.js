import axios from 'axios';
import { getLastUpdateTimestamp, updateLastUpdateTimestamp } from '../utils/syncHandler.js';
import Donation from '../model/donation.js';
import Charity from '../model/charity.js';

const fetchAndUpdateDonations = async () => {
  const lastUpdate = await getLastUpdateTimestamp('donation_last_update');

  // Fetch new donations
  const response = await axios.get(
    `https://api.example.com/donations?updated_after=${lastUpdate.toISOString()}`
  );
  const donations = response.data;

  // Save unique donations
  await Promise.all(
    donations.map(async (donation) => {
      await Donation.updateOne(
        { donation_id: donation.donation_id },
        donation,
        { upsert: true } // Insert new or update existing
      );
    })
  );

  // Update the last update timestamp
  await updateLastUpdateTimestamp('donation_last_update', new Date());
  console.log('Donations updated successfully.');
};

const fetchAndUpdateCharities = async () => {
  const lastUpdate = await getLastUpdateTimestamp('charity_last_update');

  // Fetch new charities
  const response = await axios.get(
    `https://api.example.com/charities?updated_after=${lastUpdate.toISOString()}`
  );
  const charities = response.data;

  // Save unique charities
  await Promise.all(
    charities.map(async (charity) => {
      await Charity.updateOne(
        { charity_id: charity.charity_id },
        charity,
        { upsert: true } // Insert new or update existing
      );
    })
  );

  // Update the last update timestamp
  await updateLastUpdateTimestamp('charity_last_update', new Date());
  console.log('Charities updated successfully.');
};

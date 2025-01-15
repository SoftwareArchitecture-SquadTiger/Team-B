import axios from 'axios';
import { getLastUpdateTimestamp, updateLastUpdateTimestamp } from '../utils/syncHandler.js';
import Donation from '../model/donation.js';
import Project from '../model/project.js';

const TeamAPath = process.env.TEAM_A_API_GATEWAY;

/**
 * Fetch and update donations from the remote API.
 */
const fetchAndUpdateDonations = async () => {
  try {
    const lastUpdate = await getLastUpdateTimestamp('donation_last_update');
    const currentTime = new Date();

    // Fetch new donations
    const response = await axios.get(`${TeamAPath}donation`, {
      params: {
        'internal-api': process.env.INTERNAL_API_KEY,
        timePeriod: 'custom',
        startDate: lastUpdate.toISOString(),
        endDate: currentTime.toISOString(),
      },
      withCredentials: true,
    });

    const donations = response.data?.donationResponse || [];
    if (!donations.length) {
      console.log('No new donations to update.');
      return;
    }

    // Save unique donations
    await Promise.all(
      donations.map((donation) =>
        Donation.updateOne({ donation_id: donation.donation_id }, donation, { upsert: true })
      )
    );

    // Update the last update timestamp
    await updateLastUpdateTimestamp('donation_last_update', currentTime);
    console.log(`Successfully updated ${donations.length} donations.`);
  } catch (error) {
    console.error(`Error fetching or updating donations: ${error.message}`);
    throw error;
  }
};

/**
 * Fetch and update projects from the remote API.
 */
const fetchAndUpdateProjects = async () => {
  try {
    const lastUpdate = await getLastUpdateTimestamp('project_last_update');

    // Fetch new projects
    const response = await axios.get(`${TeamAPath}projects`, {
      params: {
        'internal-api': process.env.INTERNAL_API_KEY,
        updated_after: lastUpdate.toISOString(),
      },
    });

    const projects = response.data?.projectResponse || [];
    if (!projects.length) {
      console.log('No new projects to update.');
      return;
    }

    // Save unique projects
    await Promise.all(
      projects.map((project) =>
        Project.updateOne({ project_id: project.project_id }, project, { upsert: true })
      )
    );

    // Update the last update timestamp
    await updateLastUpdateTimestamp('project_last_update', new Date());
    console.log(`Successfully updated ${projects.length} projects.`);
  } catch (error) {
    console.error(`Error fetching or updating projects: ${error.message}`);
    throw error;
  }
};

export { fetchAndUpdateDonations, fetchAndUpdateProjects };

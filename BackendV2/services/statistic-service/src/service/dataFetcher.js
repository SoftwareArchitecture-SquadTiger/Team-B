import axios from 'axios';
import { getLastUpdateTimestamp, updateLastUpdateTimestamp } from '../utils/syncHandler.js';
import Donation from '../model/donation.js';
import Project from '../model/project.js';
const TeamAPath = process.env.TEAM_B_SERVICE_URL;


const fetchAndUpdateDonations = async () => {
  const lastUpdate = await getLastUpdateTimestamp('donation_last_update');
const lastUpdateString = lastUpdate.toISOString();
// Fetch new donations
const response = await axios.get(
  `${TeamAPath}donation`,
  {
    params: {
      'internal-api': process.env.INTERNAL_API_KEY,
      startDate: lastUpdateString
    }
  }
);
const donations = response.data.donationResponse;
console.log(donations);

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

const fetchAndUpdateProjects = async () => {
  const lastUpdate = await getLastUpdateTimestamp('project_last_update');

  // Fetch new projects
  const response = await axios.get(
    `${TeamAPath}projects`,
    {
      params: {
        'internal-api': process.env.INTERNAL_API_KEY,
        updated_after: lastUpdate.toISOString
      }
    }
  );
  const projects = response.data.projectResponse;

  // Save unique projects
  await Promise.all(
    projects.map(async (project) => {
      await Project.updateOne(
        { project_id: project.project_id },
        project,
        { upsert: true } // Insert new or update existing
      );
    })
  );

  // Update the last update timestamp
  await updateLastUpdateTimestamp('project_last_update', new Date()); 
  console.log('Projects updated successfully.');
};


export { fetchAndUpdateDonations, fetchAndUpdateProjects };
import Metadata from '../model/metadata.js';

// Get the last update timestamp for a given key
export const getLastUpdateTimestamp = async (key) => {
  const metadata = await Metadata.findOne({ key });
  return metadata ? metadata.value : new Date(0); // Default to epoch if no timestamp exists
};

// Update the last update timestamp for a given key
export const updateLastUpdateTimestamp = async (key, timestamp) => {
  await Metadata.updateOne(
    { key },
    { value: timestamp },
    { upsert: true }
  );
};

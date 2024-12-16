import donorService from '../donor/service.js';

export const actionHandlers = {
  GET_ALL: async () => {
    const donors = await donorService.getAllDonors();
    return { status: 'success', data: donors };
  },
  GET_BY_ID: async (data) => {
    const donor = await donorService.getDonorById(data.id);
    return { status: 'success', data: donor ? donor.toJSON() : null };
  },
  ADD: async (data) => {
    const newDonor = await donorService.addDonor(data);
    return { status: 'success', data: newDonor.toJSON() };
  },
  UPDATE: async (data) => {
    const updatedDonor = await donorService.updateDonor(data.id, data.update);
    return { status: 'success', data: updatedDonor.toJSON() };
  },
  DELETE: async (data) => {
    await donorService.deleteDonor(data.id);
    return { status: 'success', message: 'Donor deleted successfully' };
  },
};

export const defaultHandler = async () => {
  return { status: 'error', message: 'Unknown action' };
};

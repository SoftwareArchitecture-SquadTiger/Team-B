import charityService from "../charity/service.js";

export const actionHandlers = {
  GET_ALL: async () => {
    const charities = await charityService.getAllCharities();
    return { status: "success", data: charities };
  },
  GET_BY_ID: async (data) => {
    const charity = await charityService.getCharityById(data.id);
    return { status: "success", data: charity ? charity.toJSON() : null };
  },
  GET_BY_FILTERS: async (data) => {
    const charities = await charityService.getFilteredCharities(data);
    return { status: "success", data: charities };
  },
  ADD: async (data) => {
    const newCharity = await charityService.addCharity(data);
    return { status: "success", data: newCharity.toJSON() };
  },
  UPDATE: async (data) => {
    const updatedCharity = await charityService.updateCharity(
      data.id,
      data.update
    );
    return { status: "success", data: updatedCharity.toJSON() };
  },
  DELETE: async (data) => {
    await charityService.deleteCharity(data.id);
    return { status: "success", message: "Charity deleted successfully" };
  },
};

export const defaultHandler = async () => {
  return { status: "error", message: "Unknown action" };
};
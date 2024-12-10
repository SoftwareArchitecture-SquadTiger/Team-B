import charityService from "./charity.service.js";

export const getAllCharities = async (req, res) => {
  try {
    const charities = await charityService.getAllCharities();
    res.status(200).json(charities);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch charities" });
  }
};

export const getCharityById = async (req, res) => {
  try {
    const charity = await charityService.getCharityById(req.params.id);
    if (!charity) {
      return res.status(404).json({ error: "Charity not found" });
    }
    res.status(200).json(charity);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch charity" });
  }
};

export const addCharity = async (req, res) => {
  try {
    const newCharity = await charityService.addCharity(req.body);
    res.status(201).json(newCharity);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create charity" });
  }
};

export const updateCharity = async (req, res) => {
  try {
    const updatedCharity = await charityService.updateCharity(
      req.params.id,
      req.body
    );
    if (!updatedCharity) {
      return res.status(404).json({ error: "Charity not found" });
    }
    res.status(200).json(updatedCharity);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update charity" });
  }
};

export const deleteCharity = async (req, res) => {
  try {
    const deletedCharity = await charityService.deleteCharity(req.params.id);
    if (!deletedCharity) {
      return res.status(404).json({ error: "Charity not found" });
    }
    res.status(200).json({ message: "Charity deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete charity" });
  }
};

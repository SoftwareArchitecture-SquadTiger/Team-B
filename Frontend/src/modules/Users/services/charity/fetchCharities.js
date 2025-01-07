import callCharitiesApi from "../../hooks/charity/callCharitiesApi";

export const fetchCharities = async (setCharities) => {
  try {
    const { charitiesData = []} = await callCharitiesApi();

    // Transform charity data
    const formattedCharities = charitiesData.map((charity) => ({
        id: charity.charity_id,
        name: charity.name,
        type: charity.type,
        email: charity.email,
        country: charity.country,
        role: "CHARITY",
      }));
    // Update the state
    setCharities(formattedCharities);
  } catch (error) {
    console.error("Error fetching users:", error.message);
  }
};
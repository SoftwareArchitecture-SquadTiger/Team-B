import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import AddUser from "../components/AddUser";
import UserTable from "../components/UserTable";
import Pagination from "../components/Pagination";
import { fetchCharities } from "../services/charity/fetchCharities";
import { fetchDonors } from "../services/donor/fetchDonors";
import { handleDeleteCharity } from "../services/charity/deleteCharity";
import { handleDeleteDonor } from "../services/donor/deleteDonor";
import { filterCharitiesByCountry } from "../hooks/charity/callFilterCharityByCountryApi";
import { filterCharitiesByType } from "../hooks/charity/callFilterCharityByTypeApi";
import { filterDonorsByCountry } from "../hooks/donor/callFilterDonorByCountryApi";
import searchCharities from "../services/charity/searchCharities";
import searchDonors from "../services/donor/searchDonors";
import paginate from "../services/paginate";

const UsersPage = () => {
  const [searchQueryDonor, setSearchQueryDonor] = useState("");
  const [searchQueryCharity, setSearchQueryCharity] = useState("");
  const [donorCountryFilter, setDonorCountryFilter] = useState("");
  const [charityCountryFilter, setCharityCountryFilter] = useState("");
  const [charityTypeFilter, setCharityTypeFilter] = useState("");
  const [currentDonorPage, setCurrentDonorPage] = useState(1);
  const [currentCharityPage, setCurrentCharityPage] = useState(1);
  const navigate = useNavigate();
  const [donors, setDonors] = useState([]);
  const [charities, setCharities] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const donorsPromise = fetchDonors(setDonors);
        const charitiesPromise = fetchCharities(setCharities);

        await Promise.all([donorsPromise, charitiesPromise]);
      } catch (error) {
        console.error("Error fetching users:", error.message);
      }
    };

    fetchData();
  }, []);

  const handleDonorCountryFilterChange = async (country) => {
    try {
      setDonorCountryFilter(country);
      if (country === "") {
        await fetchDonors(setDonors);
      } else {
        const filteredDonors = await filterDonorsByCountry(country);
        const formattedDonors = filteredDonors.map((donor) => ({
          id: donor.donor_id,
          name: `${donor.first_name} ${donor.last_name}`,
          role: "DONOR",
          email: donor.email,
          country: donor.country,
          type: "N/A",
        }));
        setDonors(formattedDonors);
      }
    } catch (error) {
      console.error("Error fetching filtered donors by country:", error.message);
    }
  };

  const handleCharityCountryFilterChange = async (country) => {
    try {
      setCharityCountryFilter(country);
      if (country === "") {
        await fetchCharities(setCharities);
      } else {
        const filteredCharities = await filterCharitiesByCountry(country);
        const formattedCharities = filteredCharities.map((charity) => ({
          id: charity.charity_id,
          name: charity.name,
          type: charity.type,
          email: charity.email,
          country: charity.country,
          role: "CHARITY",
        }));
        setCharities(formattedCharities);
      }
    } catch (error) {
      console.error("Error fetching filtered charities by country:", error.message);
    }
  };
  

  const handleCharityTypeFilterChange = async (type) => {
    try {
      setCharityTypeFilter(type);
      if (type === "") {
        await fetchCharities(setCharities);
      } else {
        const filteredCharities = await filterCharitiesByType(type);
        const formattedCharities = filteredCharities.map((charity) => ({
          id: charity.charity_id,
          name: charity.name,
          type: charity.type,
          email: charity.email,
          country: charity.country,
          role: "CHARITY",
        }));
        setCharities(formattedCharities);
      }
    } catch (error) {
      console.error("Error fetching filtered charities by type:", error.message);
    }
  };
  

  const filteredDonors = searchDonors(donors, searchQueryDonor);
  const { paginatedItems: paginatedDonors, totalPages: donorTotalPages } = paginate(
    filteredDonors,
    currentDonorPage,
    10
  );

  const filteredCharities = searchCharities(charities, searchQueryCharity);
  const { paginatedItems: paginatedCharities, totalPages: charityTotalPages } = paginate(
    filteredCharities,
    currentCharityPage,
    10
  );

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">Users</h2>
      </div>
      <div className="flex gap-4 mb-4">
        <AddUser onAdd={() => navigate("/users/add")} />
      </div>

      {/* Donors Table */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Donors</h3>
        <div className="flex gap-4 mb-4">
          <SearchBar
            searchQuery={searchQueryDonor}
            onSearch={(e) => setSearchQueryDonor(e.target.value)}
          />
          <select
            value={donorCountryFilter}
            onChange={(e) => handleDonorCountryFilterChange(e.target.value)}
            className="border p-2 rounded"
          >
            <option value="">All Countries</option>
            {[
              "Vietnam",
              "Germany",
              "Qatar",
              "USA",
              "Cameroon",
              "Singapore",
            ].map((country) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </select>
        </div>
        <UserTable
          users={paginatedDonors}
          onDelete={(userId) => handleDeleteDonor(userId, donors, setDonors)}
        />
        <Pagination
          totalPages={donorTotalPages}
          currentPage={currentDonorPage}
          onPageChange={setCurrentDonorPage}
        />
      </div>

      {/* Charities Table */}
      <div>
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Charities</h3>
        <div className="flex gap-4 mb-4">
          <SearchBar
            searchQuery={searchQueryCharity}
            onSearch={(e) => setSearchQueryCharity(e.target.value)}
          />
          <select
            value={charityCountryFilter}
            onChange={(e) => handleCharityCountryFilterChange(e.target.value)}
            className="border p-2 rounded"
          >
            <option value="">All Countries</option>
            {[
              "Vietnam",
              "USA",
              "South Africa",
              "Germany",
              "Ukraine",
              "Israel",
            ].map((country) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </select>
          <select
            value={charityTypeFilter}
            onChange={(e) => handleCharityTypeFilterChange(e.target.value)}
            className="border p-2 rounded"
          >
            <option value="">All Types</option>
            {[
              "Non-Profit",
              "Company",
              "Individual",
            ].map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
        <UserTable
          users={paginatedCharities}
          onDelete={(userId) => handleDeleteCharity(userId, charities, setCharities)}
        />
        <Pagination
          totalPages={charityTotalPages}
          currentPage={currentCharityPage}
          onPageChange={setCurrentCharityPage}
        />
      </div>
    </div>
  );
};

export default UsersPage;








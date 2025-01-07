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

  // Filter donors by search query and country
  const filteredDonors = searchDonors(
    donors.filter((donor) =>
      donorCountryFilter
        ? donor.country.toLowerCase().includes(donorCountryFilter.toLowerCase())
        : true
    ),
    searchQueryDonor,
    "DONOR"
  );
  const { paginatedItems: paginatedDonors, totalPages: donorTotalPages } = paginate(
    filteredDonors,
    currentDonorPage,
    10
  );

  // Filter charities by search query, country, and type
  const filteredCharities = searchCharities(
    charities.filter((charity) => {
      const countryMatch = charityCountryFilter
        ? charity.country.toLowerCase().includes(charityCountryFilter.toLowerCase())
        : true;
      const typeMatch = charityTypeFilter
        ? charity.type.toLowerCase().includes(charityTypeFilter.toLowerCase())
        : true;
      return countryMatch && typeMatch;
    }),
    searchQueryCharity,
    "CHARITY"
  );
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
          <input
            type="text"
            placeholder="Filter by country"
            value={donorCountryFilter}
            onChange={(e) => setDonorCountryFilter(e.target.value)}
            className="border p-2"
          />
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
          <input
            type="text"
            placeholder="Filter by country"
            value={charityCountryFilter}
            onChange={(e) => setCharityCountryFilter(e.target.value)}
            className="border p-2"
          />
          <input
            type="text"
            placeholder="Filter by type"
            value={charityTypeFilter}
            onChange={(e) => setCharityTypeFilter(e.target.value)}
            className="border p-2"
          />
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
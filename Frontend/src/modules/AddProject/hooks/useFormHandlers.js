export const handleChange = (e, projectData, setProjectData, setFilteredCountries = null) => {
    const { name, value } = e.target;
    if (name === "region" && setFilteredCountries) {
      const regionsWithCountries = {
        "North America": ["United States", "Canada", "Mexico"],
        Europe: ["United Kingdom", "Germany", "France"],
        Asia: ["China", "Japan", "India"],
        "Southeast Asia": ["Vietnam", "Thailand", "Indonesia"],
      };
      setFilteredCountries(regionsWithCountries[value] || []);
      setProjectData({ ...projectData, region: value, country: "" });
    } else {
      setProjectData({ ...projectData, [name]: value });
    }
  };
  
  export const handleNumberChange = (e, projectData, setProjectData) => {
    const { name, value } = e.target;
    if (/^\d*$/.test(value)) {
      setProjectData({ ...projectData, [name]: value });
    }
  };
  
  export const handleFileChange = (e, projectData, setProjectData) => {
    const { name } = e.target;
    const files = Array.from(e.target.files);
    setProjectData({ ...projectData, [name]: files });
  };
  
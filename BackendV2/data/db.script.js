import { MongoClient } from "mongodb";
import { v4 as uuidv4 } from "uuid"

const clusterURI = "mongodb+srv://admin:iamadmin@monolithic-cluster.xgeha.mongodb.net/?retryWrites=true&w=majority&appName=Monolithic-Cluster";

const charityData = [
  {
    name: "Individual Vietnam",
    email: "individual_vn@example.com",
    phone: "123456789",
    type: "Individual",
    address: {
      street: "123 Nguyen Trai",
      city: "Hanoi",
      state: "Hanoi",
      zip: "100000",
    },
    country: "Vietnam",
    tax_code: "VN123456",
    img_url: null,
    paypal_email: "vn_individual@example.com",
  },
  {
    name: "Individual USA",
    email: "individual_us@example.com",
    phone: "987654321",
    type: "Individual",
    address: {
      street: "456 Elm Street",
      city: "New York",
      state: "NY",
      zip: "10001",
    },
    country: "USA",
    tax_code: "US654321",
    img_url: null,
    paypal_email: "us_individual@example.com",
  },
  {
    name: "Company South Africa",
    email: "company_sa@example.com",
    phone: "1122334455",
    type: "Company",
    address: {
      street: "789 Mandela Road",
      city: "Cape Town",
      state: "Western Cape",
      zip: "8000",
    },
    country: "South Africa",
    tax_code: "SA987654",
    img_url: null,
    paypal_email: "sa_company@example.com",
  },
  {
    name: "Company Germany",
    email: "company_de@example.com",
    phone: "9988776655",
    type: "Company",
    address: {
      street: "321 Goethe Street",
      city: "Berlin",
      state: "Berlin",
      zip: "10117",
    },
    country: "Germany",
    tax_code: "DE123987",
    img_url: null,
    paypal_email: "de_company@example.com",
  },
  {
    name: "Non-Profit Ukraine",
    email: "nonprofit_ua@example.com",
    phone: "6677889900",
    type: "Non-Profit",
    address: {
      street: "789 Shevchenko Ave",
      city: "Kyiv",
      state: "Kyiv",
      zip: "02000",
    },
    country: "Ukraine",
    tax_code: "UA456789",
    img_url: null,
    paypal_email: "ua_nonprofit@example.com",
  },
  {
    name: "Non-Profit Israel",
    email: "nonprofit_il@example.com",
    phone: "4455667788",
    type: "Non-Profit",
    address: {
      street: "123 Ben Yehuda Street",
      city: "Tel Aviv",
      state: "Tel Aviv",
      zip: "61000",
    },
    country: "Israel",
    tax_code: "IL789012",
    img_url: null,
    paypal_email: "il_nonprofit@example.com",
  },
];

const donorData = [
  ...Array(5).fill().map((_, index) => ({
    first_name: `Donor${index + 1}`,
    last_name: "Vietnam",
    email: `donor${index + 1}_vn@example.com`,
    phone: `123456789${index + 1}`,
    country: "Vietnam",
    address: {
      street: "123 Nguyen Trai",
      city: "Hanoi",
      state: "Hanoi",
      postal_code: "100000",
      country: "Vietnam",
    },
    img_url: null,
  })),
  ...Array(5).fill().map((_, index) => ({
    first_name: `Donor${index + 1}`,
    last_name: "Germany",
    email: `donor${index + 1}_de@example.com`,
    phone: `234567890${index + 1}`,
    country: "Germany",
    address: {
      street: "123 Goethe Street",
      city: "Berlin",
      state: "Berlin",
      postal_code: "10117",
      country: "Germany",
    },
    img_url: null,
  })),
  ...Array(5).fill().map((_, index) => ({
    first_name: `Donor${index + 1}`,
    last_name: "Qatar",
    email: `donor${index + 1}_qa@example.com`,
    phone: `345678901${index + 1}`,
    country: "Qatar",
    address: {
      street: "123 Doha Street",
      city: "Doha",
      state: "Doha",
      postal_code: "00000",
      country: "Qatar",
    },
    img_url: null,
  })),
  ...Array(5).fill().map((_, index) => ({
    first_name: `Donor${index + 1}`,
    last_name: "USA",
    email: `donor${index + 1}_us@example.com`,
    phone: `456789012${index + 1}`,
    country: "USA",
    address: {
      street: "123 Elm Street",
      city: "New York",
      state: "NY",
      postal_code: "10001",
      country: "USA",
    },
    img_url: null,
  })),
  ...Array(5).fill().map((_, index) => ({
    first_name: `Donor${index + 1}`,
    last_name: "Cameroon",
    email: `donor${index + 1}_cm@example.com`,
    phone: `567890123${index + 1}`,
    country: "Cameroon",
    address: {
      street: "123 Yaounde Ave",
      city: "Yaounde",
      state: "Center",
      postal_code: "00001",
      country: "Cameroon",
    },
    img_url: null,
  })),
];

const subscriptionData = [
  {
    categories: ["Health", "Education"],
    regions: ["Asia", "Europe"],
  },
  {
    categories: ["Environment", "Animal Welfare"],
    regions: ["Africa", "North America"],
  },
  {
    categories: ["Poverty Alleviation", "Disaster Relief"],
    regions: ["South America", "Middle East"],
  },
  {
    categories: ["Human Rights", "Arts & Culture"],
    regions: ["Global"],
  },
];

const seedDatabase = async () => {
  const client = new MongoClient(clusterURI);

  try {
    await client.connect();
    console.log("Connected to MongoDB");

    const charityDb = client.db("charityDB");
    const donorDb = client.db("donorDB");

    // Clear existing data
    await charityDb.collection("charities").deleteMany({});
    await donorDb.collection("donors").deleteMany({});
    await donorDb.collection("subscriptions").deleteMany({});
    console.log("Databases cleared");

    // Insert charities
    await charityDb.collection("charities").insertMany(
      charityData.map((charity) => ({
        ...charity,
        charity_id: uuidv4(),
        createdAt: new Date(),
        updatedAt: new Date(),
      }))
    );

    // Insert donors
    const donors = donorData.map((donor) => ({
      ...donor,
      donor_id: uuidv4(),
      createdAt: new Date(),
      updatedAt: new Date(),
    }));
    await donorDb.collection("donors").insertMany(donors);
    console.log("Donors and charities inserted successfully");

    // Insert subscriptions linked to donor emails
    const subscriptions = donors.map((donor, index) => {
      const subscriptionTemplate = subscriptionData[index % subscriptionData.length]; 
      return {
        email: donor.email, 
        categories: subscriptionTemplate.categories,
        regions: subscriptionTemplate.regions,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
    });
    await donorDb.collection("subscriptions").insertMany(subscriptions);
    console.log("Subscriptions inserted successfully");

  } catch (error) {
    console.error("Error seeding database:", error);
  } finally {
    await client.close();
    console.log("Connection closed");
  }
};

seedDatabase();

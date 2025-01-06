import { MongoClient } from "mongodb";

const uri =
  "mongodb+srv://admin:iamadmin@monolithic-cluster.xgeha.mongodb.net/?retryWrites=true&w=majority&appName=Monolithic-Cluster";

const categories = [
  "Food",
  "Health",
  "Education",
  "Environment",
  "Religion",
  "Humanitarian",
  "Housing",
  "Other",
];

const regions = [
  "Africa",
  "Antarctica",
  "Asia",
  "Europe",
  "North America",
  "Oceania",
  "South America",
];

const getRandomData = (arr, num) => {
  const result = [];
  const arrCopy = [...arr];
  for (let i = 0; i < num; i++) {
    const randomIndex = Math.floor(Math.random() * arrCopy.length);
    result.push(arrCopy.splice(randomIndex, 1)[0]);
  }
  return result;
};

const populateSubscriptionsForDonors = async () => {
  const client = new MongoClient(uri);

  try {
    // Connect to the database
    await client.connect();
    console.log("Connected to MongoDB");

    const database = client.db("donorDB"); // Replace with your database name
    const donorsCollection = database.collection("donors"); // Replace with your donors collection name
    const subscriptionsCollection = database.collection("subscriptions"); // Replace with your subscriptions collection name

    // Fetch all donor emails
    const donors = await donorsCollection
      .find({}, { projection: { email: 1, _id: 0 } })
      .toArray();
    console.log(`Fetched ${donors.length} donor emails`);

    // Generate subscription data for each donor email
    const subscriptions = donors.map((donor) => ({
      email: donor.email,
      categories: getRandomData(categories, Math.floor(Math.random() * 3) + 1), // 1-3 random categories
      regions: getRandomData(regions, Math.floor(Math.random() * 3) + 1), // 1-3 random regions
      createdAt: new Date(),
      updatedAt: new Date(),
    }));

    // Insert subscription data into the subscriptions collection
    const result = await subscriptionsCollection.insertMany(subscriptions);
    console.log(
      `${result.insertedCount} subscriptions populated successfully!`
    );

    // Close the connection
    await client.close();
    console.log("Connection closed");
  } catch (error) {
    console.error("Error populating subscriptions:", error);
    await client.close(); // Ensure the connection is closed on error
  }
};

// Run the script
populateSubscriptionsForDonors();

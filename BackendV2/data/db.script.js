import { MongoClient } from "mongodb";

const clusterURI = "mongodb+srv://admin:iamadmin@monolithic-cluster.xgeha.mongodb.net/?retryWrites=true&w=majority&appName=Monolithic-Cluster";

const backfillPaypalEmails = async () => {
  const client = new MongoClient(clusterURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  try {
    // Connect to the MongoDB cluster
    await client.connect();
    console.log("Connected to MongoDB!");

    // Get the charityDB and the 'charities' collection
    const charityDb = client.db("charityDB");
    const charitiesCollection = charityDb.collection("charities");

    // Update all documents that are missing the paypal_email field
    const result = await charitiesCollection.updateMany(
      { paypal_email: { $exists: false } }, // Match documents without the paypal_email field
      { $set: { paypal_email: "default@example.com" } } // Set a default value
    );

    console.log(`Backfilled ${result.modifiedCount} documents.`);
  } catch (error) {
    console.error("Error backfilling paypal_email:", error);
  } finally {
    // Close the connection
    await client.close();
    console.log("MongoDB connection closed.");
  }
};

// Run the script
backfillPaypalEmails();

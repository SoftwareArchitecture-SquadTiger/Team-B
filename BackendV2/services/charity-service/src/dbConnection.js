import mongoose from "mongoose";

const connections = {};

export const getDbConnection = (dbName, clusterURI) => {
  if (!connections[dbName]) {
    
    const dbURI = clusterURI.includes("?")
      ? clusterURI.replace("?", `${dbName}?`) // Insert dbName before query params
      : `${clusterURI}/${dbName}`; // If no query params, simply append dbName

    console.log(`Connecting to database: ${dbURI}`);

    connections[dbName] = mongoose.createConnection(dbURI);

    connections[dbName].on("connected", () =>
      console.log(`Connected to database: ${dbName}`)
    );

    connections[dbName].on("error", (err) =>
      console.error(`Database connection error for ${dbName}:`, err)
    );
  };

  return connections[dbName];
};

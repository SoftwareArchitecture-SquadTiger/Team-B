import { getDbConnection } from '../../Config/dbConnections.js';

const clusterURI = process.env.MONGO_URI;

const charityDb = getDbConnection('charityDB', clusterURI);

//something...
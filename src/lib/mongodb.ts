
import { MongoClient, ServerApiVersion } from 'mongodb';

// Connection setup for MongoDB Atlas
// Note: You need to set MONGODB_URI in your environment variables
const uri = import.meta.env.VITE_MONGODB_URI || '';

// Create a MongoDB client with appropriate options
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

// Database name - you can change this to match your MongoDB Atlas setup
const dbName = 'ctrlu_db';

/**
 * Connects to MongoDB and returns the database instance
 */
export async function connectToDatabase() {
  if (!uri) {
    throw new Error('Please define the VITE_MONGODB_URI environment variable');
  }
  
  try {
    // Connect the client to the server
    await client.connect();
    console.log("Connected successfully to MongoDB");
    
    // Return the database instance
    return client.db(dbName);
  } catch (error) {
    console.error("Failed to connect to MongoDB", error);
    throw error;
  }
}

/**
 * Closes the MongoDB connection
 */
export async function closeConnection() {
  await client.close();
  console.log("MongoDB connection closed");
}

// For convenience, export the database types
export { MongoClient };

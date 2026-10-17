import { MongoClient, Db } from "mongodb";

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB || "mk-connection";

if (!uri) {
  // Thrown only when a route actually tries to use the DB, not at build time.
  console.warn("MONGODB_URI is not set — database-backed routes will fail until it is.");
}

let clientPromise: Promise<MongoClient> | null = null;

function getClientPromise(): Promise<MongoClient> {
  if (!uri) throw new Error("MONGODB_URI is not configured.");

  // Reuse the connection across hot-reloads in development, and across
  // invocations in serverless production, instead of opening a new one each call.
  const globalWithMongo = global as typeof globalThis & { _mongoClientPromise?: Promise<MongoClient> };

  if (process.env.NODE_ENV === "development") {
    if (!globalWithMongo._mongoClientPromise) {
      const client = new MongoClient(uri);
      globalWithMongo._mongoClientPromise = client.connect();
    }
    return globalWithMongo._mongoClientPromise;
  }

  if (!clientPromise) {
    const client = new MongoClient(uri);
    clientPromise = client.connect();
  }
  return clientPromise;
}

export async function getDb(): Promise<Db> {
  const client = await getClientPromise();
  return client.db(dbName);
}

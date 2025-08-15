// lib/mongodb.ts
import { MongoClient, MongoClientOptions } from "mongodb";

const uri: string | undefined = process.env.MONGODB_URI;
const options: MongoClientOptions = {};

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

declare global {
    // eslint-disable-next-line no-var
    var _mongoClientPromise: Promise<MongoClient> | undefined;
}

if (!uri) {
    throw new Error("Please add MONGODB_URI to your .env.local");
}

if (process.env.NODE_ENV === "development") {
    if (!global._mongoClientPromise) {
        client = new MongoClient(uri, options);
        global._mongoClientPromise = client.connect();
    }
    clientPromise = global._mongoClientPromise!;
} else {
    client = new MongoClient(uri, options);
    clientPromise = client.connect();
}

export default clientPromise;

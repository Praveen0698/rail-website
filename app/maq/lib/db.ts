import mongoose from "mongoose";

const MONGODB_URI = process.env.MAQ_MONGODB_URI as string;

if (!MONGODB_URI) {
  throw new Error("Please add MAQ_MONGODB_URI to .env");
}

declare global {
  var mongoose_maq: { conn: any; promise: any } | undefined;
}

let cached = global.mongoose_maq;

if (!cached) {
  cached = global.mongoose_maq = { conn: null, promise: null };
}

export async function connectDB() {
  if (cached!.conn) return cached!.conn;

  if (!cached!.promise) {
    cached!.promise = mongoose.connect(MONGODB_URI, {
      bufferCommands: false,
      dbName: "maq",
    });
  }

  cached!.conn = await cached!.promise;
  return cached!.conn;
}
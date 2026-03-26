import mongoose, { Mongoose } from "mongoose";

const MONGODB_URI = process.env.MAQ_MONGODB_URI as string;

if (!MONGODB_URI) {
  throw new Error("Please add MAQ_MONGODB_URI to .env");
}

declare global {
  // 👇 Define proper types instead of any
  // eslint-disable-next-line no-var
  var mongoose_maq:
    | {
        conn: Mongoose | null;
        promise: Promise<Mongoose> | null;
      }
    | undefined;
}

let cached = global.mongoose_maq;

if (!cached) {
  cached = global.mongoose_maq = {
    conn: null,
    promise: null,
  };
}

export async function connectDB(): Promise<Mongoose> {
  if (cached!.conn) return cached!.conn;

  if (!cached!.promise) {
    cached!.promise = mongoose.connect(MONGODB_URI);
  }

  cached!.conn = await cached!.promise;
  return cached!.conn;
}
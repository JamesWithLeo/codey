import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "./generated/prisma/client";

// Define a global type to persist both the Pool and PrismaClient in dev mode
const globalForPrisma = globalThis as unknown as {
  prisma?: PrismaClient;
  pgPool?: Pool;
};

// 1. Reuse existing Pool or create a single managed instance
const pool =
  globalForPrisma.pgPool ??
  new Pool({
    connectionString: process.env.DATABASE_URL,
    max: 10, // Maximum number of clients in the pool
    idleTimeoutMillis: 30000, // Close idle clients after 30 seconds
    connectionTimeoutMillis: 10000, // Timeout after 10s if a connection cannot be established
  });

// 2. Attach adapter to the pool
const adapter = new PrismaPg(pool);

// 3. Reuse existing Prisma client or instantiate a new one
export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    adapter,
    log: ["error"],
  });

// 4. Save to globalThis in development to survive Next.js Fast Refresh
if (process.env.NODE_ENV !== "production") {
  globalForPrisma.pgPool = pool;
  globalForPrisma.prisma = prisma;
}

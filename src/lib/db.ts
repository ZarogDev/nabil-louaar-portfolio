import { PrismaClient } from "@/generated/prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";

function createPrisma() {
  const url = process.env.DATABASE_URL ?? "file:./prisma/dev.db";
  // Strip the "file:" prefix that SQLite connection strings use
  const dbPath = url.startsWith("file:") ? url.slice(5) : url;
  const adapter = new PrismaBetterSqlite3({ url: dbPath });
  return new PrismaClient({ adapter });
}

// Singleton pattern: prevents multiple PrismaClient instances during Next.js hot-reload.
const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

export const prisma = globalForPrisma.prisma ?? createPrisma();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

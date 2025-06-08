/**
 * Prisma client mock for development
 * This will be replaced with a proper Prisma setup once we fully integrate with the database
 */

// Define a simple mock Prisma client
const mockPrismaClient = {
  user: {
    findUnique: () => Promise.resolve(null),
    findMany: () => Promise.resolve([]),
    create: () => Promise.resolve({}),
    update: () => Promise.resolve({}),
    delete: () => Promise.resolve({}),
  },
  // Add other models as needed
};

// For development, we'll use a simple mock
// In production, this would be replaced with a real PrismaClient
const prisma = mockPrismaClient;

// Export the mock client
export default prisma;

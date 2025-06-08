// This is a temporary type declaration file for Prisma
// It will be replaced when Prisma is properly installed

declare module '@prisma/client' {
  export class PrismaClient {
    constructor(options?: {
      log?: Array<'query' | 'info' | 'warn' | 'error'>;
      datasources?: {
        db: {
          url: string;
        };
      };
    });
  }
}

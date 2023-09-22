-- CreateEnum
CREATE TYPE "IntegrationType" AS ENUM ('STRIPE', 'PAYPAL', 'NONE', 'API');

-- AlterTable
ALTER TABLE "Organization" ADD COLUMN     "type" "IntegrationType";

/*
  Warnings:

  - You are about to drop the column `companyContactCompanyId` on the `Company` table. All the data in the column will be lost.
  - You are about to drop the column `companySocialsCompanyId` on the `Company` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Company" DROP COLUMN "companyContactCompanyId",
DROP COLUMN "companySocialsCompanyId";

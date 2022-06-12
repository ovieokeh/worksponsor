/*
  Warnings:

  - You are about to drop the column `category` on the `Company` table. All the data in the column will be lost.
  - Added the required column `address` to the `Company` table without a default value. This is not possible if the table is not empty.
  - Added the required column `numOfEmployees` to the `Company` table without a default value. This is not possible if the table is not empty.
  - Added the required column `websiteUrl` to the `Company` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Company" DROP COLUMN "category",
ADD COLUMN     "address" TEXT NOT NULL,
ADD COLUMN     "numOfEmployees" TEXT NOT NULL,
ADD COLUMN     "websiteUrl" TEXT NOT NULL;

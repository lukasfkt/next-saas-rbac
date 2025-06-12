/*
  Warnings:

  - Made the column `updated_at` on table `organizations` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "organizations" ALTER COLUMN "updated_at" SET NOT NULL;

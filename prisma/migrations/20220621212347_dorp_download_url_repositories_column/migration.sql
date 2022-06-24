/*
  Warnings:

  - You are about to drop the column `download_url` on the `repositories` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "repositories" DROP COLUMN "download_url";

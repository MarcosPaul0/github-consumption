/*
  Warnings:

  - You are about to drop the column `frequency` on the `code_frequency` table. All the data in the column will be lost.
  - Added the required column `additions` to the `code_frequency` table without a default value. This is not possible if the table is not empty.
  - Added the required column `date` to the `code_frequency` table without a default value. This is not possible if the table is not empty.
  - Added the required column `deletions` to the `code_frequency` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "code_frequency_repo_id_key";

-- AlterTable
ALTER TABLE "code_frequency" DROP COLUMN "frequency",
ADD COLUMN     "additions" INTEGER NOT NULL,
ADD COLUMN     "date" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "deletions" INTEGER NOT NULL;

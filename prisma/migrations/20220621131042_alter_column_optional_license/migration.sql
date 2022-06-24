-- DropForeignKey
ALTER TABLE "repositories" DROP CONSTRAINT "repositories_license_id_fkey";

-- AlterTable
ALTER TABLE "repositories" ALTER COLUMN "license_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "repositories" ADD CONSTRAINT "repositories_license_id_fkey" FOREIGN KEY ("license_id") REFERENCES "licenses"("id") ON DELETE SET NULL ON UPDATE CASCADE;

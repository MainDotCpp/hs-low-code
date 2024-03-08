/*
  Warnings:

  - You are about to drop the column `write_url` on the `t_visit_log` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "t_visit_log" DROP COLUMN "write_url",
ADD COLUMN     "white_url" VARCHAR(255),
ALTER COLUMN "filterReason" DROP NOT NULL;

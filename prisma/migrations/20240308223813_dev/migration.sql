/*
  Warnings:

  - You are about to drop the column `filterReason` on the `t_visit_log` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "t_visit_log" DROP COLUMN "filterReason",
ADD COLUMN     "filter_flag" BOOLEAN NOT NULL DEFAULT false;

/*
  Warnings:

  - You are about to drop the column `filter_reason` on the `t_visit_log` table. All the data in the column will be lost.
  - You are about to drop the column `host` on the `t_visit_log` table. All the data in the column will be lost.
  - You are about to drop the column `language` on the `t_visit_log` table. All the data in the column will be lost.
  - Added the required column `filterReason` to the `t_visit_log` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "t_visit_log" DROP COLUMN "filter_reason",
DROP COLUMN "host",
DROP COLUMN "language",
ADD COLUMN     "filterReason" VARCHAR(32) NOT NULL;

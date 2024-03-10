/*
  Warnings:

  - Added the required column `filter_reason` to the `t_visit_log` table without a default value. This is not possible if the table is not empty.
  - Added the required column `filter_type` to the `t_visit_log` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ip` to the `t_visit_log` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "t_visit_log" ADD COLUMN     "cloak_label" VARCHAR(64),
ADD COLUMN     "filter_reason" VARCHAR(32) NOT NULL,
ADD COLUMN     "filter_type" VARCHAR(32) NOT NULL,
ADD COLUMN     "ip" VARCHAR(32) NOT NULL,
ADD COLUMN     "use_cloak" BOOLEAN NOT NULL DEFAULT false;

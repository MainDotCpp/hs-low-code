/*
  Warnings:

  - Added the required column `filter_reason` to the `t_visit_log` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ip` to the `t_visit_log` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `filter_type` on the `t_visit_log` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "t_visit_log" ADD COLUMN     "filter_reason" VARCHAR(32) NOT NULL,
ADD COLUMN     "host" TEXT,
ADD COLUMN     "ip" VARCHAR(32) NOT NULL,
ADD COLUMN     "language" TEXT,
DROP COLUMN "filter_type",
ADD COLUMN     "filter_type" VARCHAR(32) NOT NULL;

-- DropEnum
DROP TYPE "FilterType";

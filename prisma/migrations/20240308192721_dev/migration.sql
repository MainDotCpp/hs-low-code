/*
  Warnings:

  - You are about to drop the column `filter_reason` on the `t_visit_log` table. All the data in the column will be lost.
  - You are about to drop the column `host` on the `t_visit_log` table. All the data in the column will be lost.
  - You are about to drop the column `ip` on the `t_visit_log` table. All the data in the column will be lost.
  - You are about to drop the column `language` on the `t_visit_log` table. All the data in the column will be lost.
  - You are about to drop the column `sec_ch_ua_platform` on the `t_visit_log` table. All the data in the column will be lost.
  - You are about to alter the column `user_agent` on the `t_visit_log` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `cloak_label` on the `t_visit_log` table. The data in that column could be lost. The data in that column will be cast from `VarChar(64)` to `VarChar(48)`.
  - The `filter_type` column on the `t_visit_log` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `ip_address` to the `t_visit_log` table without a default value. This is not possible if the table is not empty.
  - Added the required column `page_id` to the `t_visit_log` table without a default value. This is not possible if the table is not empty.
  - Made the column `user_agent` on table `t_visit_log` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "FilterType" AS ENUM ('WHITE', 'OFFER');

-- AlterTable
ALTER TABLE "t_visit_log" DROP COLUMN "filter_reason",
DROP COLUMN "host",
DROP COLUMN "ip",
DROP COLUMN "language",
DROP COLUMN "sec_ch_ua_platform",
ADD COLUMN     "ip_address" VARCHAR(32) NOT NULL,
ADD COLUMN     "lang" VARCHAR(64),
ADD COLUMN     "page_id" UUID NOT NULL,
ADD COLUMN     "query" VARCHAR(255),
ADD COLUMN     "referer" VARCHAR(255),
ADD COLUMN     "write_url" VARCHAR(255),
ALTER COLUMN "user_agent" SET NOT NULL,
ALTER COLUMN "user_agent" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "create_at" SET DATA TYPE TIMESTAMP(6),
ALTER COLUMN "cloak_label" SET DATA TYPE VARCHAR(48),
DROP COLUMN "filter_type",
ADD COLUMN     "filter_type" "FilterType" NOT NULL DEFAULT 'WHITE',
ALTER COLUMN "use_cloak" DROP DEFAULT;

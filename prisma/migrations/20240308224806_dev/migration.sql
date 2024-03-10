-- CreateEnum
CREATE TYPE "FilterPageEnum" AS ENUM ('WHITE', 'OFFER');

-- AlterTable
ALTER TABLE "t_visit_log" ADD COLUMN     "filter_page" "FilterPageEnum" NOT NULL DEFAULT 'OFFER';

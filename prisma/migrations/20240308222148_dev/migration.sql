/*
  Warnings:

  - You are about to drop the column `user_agent` on the `t_visit_log` table. All the data in the column will be lost.
  - Added the required column `userAgent` to the `t_visit_log` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "t_visit_log" DROP COLUMN "user_agent",
ADD COLUMN     "userAgent" VARCHAR(255) NOT NULL;

/*
  Warnings:

  - You are about to drop the column `userAgent` on the `t_visit_log` table. All the data in the column will be lost.
  - Added the required column `user_agent` to the `t_visit_log` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "t_visit_log" DROP COLUMN "userAgent",
ADD COLUMN     "user_agent" VARCHAR(255) NOT NULL;

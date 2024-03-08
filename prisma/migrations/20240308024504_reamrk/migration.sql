-- AlterTable
ALTER TABLE "t_page" ADD COLUMN     "remark" VARCHAR(255),
ADD COLUMN     "tags" JSON NOT NULL DEFAULT '[]';

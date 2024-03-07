-- AlterTable
ALTER TABLE "t_page" ADD COLUMN     "extra_script" TEXT,
ADD COLUMN     "script_links" JSON DEFAULT '[]';

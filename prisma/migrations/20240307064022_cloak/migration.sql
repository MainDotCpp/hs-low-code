-- AlterTable
ALTER TABLE "t_page" ADD COLUMN     "cloak_label" VARCHAR(32),
ADD COLUMN     "use_cloak" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "white_url" TEXT;

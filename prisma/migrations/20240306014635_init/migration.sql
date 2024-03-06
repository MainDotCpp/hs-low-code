-- CreateTable
CREATE TABLE "t_domain" (
    "id" UUID NOT NULL,
    "domain" VARCHAR(255) NOT NULL,
    "area" VARCHAR(255) NOT NULL,
    "status" INTEGER NOT NULL DEFAULT 0,
    "create_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "t_domain_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "t_page" (
    "id" UUID NOT NULL,
    "name" VARCHAR(32) NOT NULL,
    "title" VARCHAR(32),
    "create_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "ban_redirect_link" VARCHAR(255),
    "ban_count" INTEGER NOT NULL DEFAULT 0,
    "access_count" INTEGER NOT NULL DEFAULT 0,
    "content" JSON DEFAULT '{"children":[]}',
    "status" INTEGER NOT NULL DEFAULT 0,
    "click_link_count" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "t_page_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "t_visit_log" (
    "id" SERIAL NOT NULL,
    "user_agent" TEXT,
    "language" TEXT,
    "host" TEXT,
    "create_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "sec_ch_ua_platform" TEXT,

    CONSTRAINT "t_visit_log_pkey" PRIMARY KEY ("id")
);

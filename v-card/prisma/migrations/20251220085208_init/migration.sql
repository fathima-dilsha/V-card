-- CreateEnum
CREATE TYPE "ContactType" AS ENUM ('MOBILE', 'EMAIL', 'ADDRESS');

-- CreateEnum
CREATE TYPE "SocialPlatform" AS ENUM ('INSTAGRAM', 'FACEBOOK', 'LINKEDIN', 'TWITTER', 'YOUTUBE', 'TIKTOK', 'GITHUB', 'PINTEREST', 'SNAPCHAT', 'WHATSAPP', 'TELEGRAM', 'OTHER');

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "fullName" VARCHAR(100) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sessions" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "token" VARCHAR(500) NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "sessions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "vcards" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "jobTitle" VARCHAR(100),
    "companyName" VARCHAR(100),
    "heading" VARCHAR(255),
    "description" TEXT,
    "videoUrl" VARCHAR(500),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "vcards_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "contact_details" (
    "id" SERIAL NOT NULL,
    "vCardId" INTEGER NOT NULL,
    "type" "ContactType" NOT NULL,
    "value" VARCHAR(500) NOT NULL,
    "label" VARCHAR(50),
    "isPrimary" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "contact_details_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "social_links" (
    "id" SERIAL NOT NULL,
    "vCardId" INTEGER NOT NULL,
    "platform" "SocialPlatform" NOT NULL,
    "url" VARCHAR(500) NOT NULL,
    "username" VARCHAR(100),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "social_links_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "web_links" (
    "id" SERIAL NOT NULL,
    "vCardId" INTEGER NOT NULL,
    "title" VARCHAR(200) NOT NULL,
    "url" VARCHAR(500) NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "web_links_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE INDEX "users_email_idx" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "sessions_token_key" ON "sessions"("token");

-- CreateIndex
CREATE INDEX "sessions_userId_idx" ON "sessions"("userId");

-- CreateIndex
CREATE INDEX "sessions_token_idx" ON "sessions"("token");

-- CreateIndex
CREATE UNIQUE INDEX "vcards_userId_key" ON "vcards"("userId");

-- CreateIndex
CREATE INDEX "vcards_userId_idx" ON "vcards"("userId");

-- CreateIndex
CREATE INDEX "contact_details_vCardId_idx" ON "contact_details"("vCardId");

-- CreateIndex
CREATE INDEX "contact_details_type_idx" ON "contact_details"("type");

-- CreateIndex
CREATE INDEX "social_links_vCardId_idx" ON "social_links"("vCardId");

-- CreateIndex
CREATE INDEX "social_links_platform_idx" ON "social_links"("platform");

-- CreateIndex
CREATE INDEX "web_links_vCardId_idx" ON "web_links"("vCardId");

-- AddForeignKey
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vcards" ADD CONSTRAINT "vcards_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "contact_details" ADD CONSTRAINT "contact_details_vCardId_fkey" FOREIGN KEY ("vCardId") REFERENCES "vcards"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "social_links" ADD CONSTRAINT "social_links_vCardId_fkey" FOREIGN KEY ("vCardId") REFERENCES "vcards"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "web_links" ADD CONSTRAINT "web_links_vCardId_fkey" FOREIGN KEY ("vCardId") REFERENCES "vcards"("id") ON DELETE CASCADE ON UPDATE CASCADE;

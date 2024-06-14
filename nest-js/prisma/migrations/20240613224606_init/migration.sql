-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN');

-- CreateEnum
CREATE TYPE "ItemType" AS ENUM ('HELMET', 'MASK', 'CHESTPIECE', 'GAUNTLET', 'GLOVE', 'PANTS', 'BOOTS', 'ACCESSORY', 'JEWELRY', 'WEAPON', 'ARTIFACT');

-- CreateTable
CREATE TABLE "Users" (
    "id" UUID NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'USER',
    "bio" TEXT DEFAULT 'No user bio',
    "avatarURL" TEXT NOT NULL DEFAULT 'default',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Campaigns" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "Campaigns_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Characters" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT DEFAULT 'No description',
    "avatarURL" TEXT NOT NULL DEFAULT 'https://www.dndbeyond.com/avatars/40939/576/1581111423-121855753.jpeg?width=150&height=150&fit=crop&quality=95&auto=webp',
    "campaignId" UUID NOT NULL,
    "inventoryId" UUID NOT NULL,
    "STR" INTEGER NOT NULL,
    "DEX" INTEGER NOT NULL,
    "CON" INTEGER NOT NULL,
    "WIS" INTEGER NOT NULL,
    "INT" INTEGER NOT NULL,
    "CHA" INTEGER NOT NULL,
    "GP" INTEGER NOT NULL,
    "SP" INTEGER NOT NULL,
    "CP" INTEGER NOT NULL,
    "HP" INTEGER NOT NULL,
    "maxHP" INTEGER NOT NULL,
    "AC" INTEGER NOT NULL,
    "walkingSpeed" INTEGER NOT NULL,

    CONSTRAINT "Characters_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CampaignUsers" (
    "campaignId" UUID NOT NULL,
    "userId" UUID NOT NULL,

    CONSTRAINT "CampaignUsers_pkey" PRIMARY KEY ("campaignId","userId")
);

-- CreateTable
CREATE TABLE "Inventory" (
    "id" UUID NOT NULL,

    CONSTRAINT "Inventory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Item" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "url" TEXT NOT NULL DEFAULT 'default',
    "type" "ItemType" NOT NULL,
    "goldCost" INTEGER,
    "silverCost" INTEGER,
    "copperCost" INTEGER,
    "goldValue" INTEGER,
    "silverValue" INTEGER,
    "copperValue" INTEGER,
    "creatorId" UUID,

    CONSTRAINT "Item_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InventoryItem" (
    "itemId" UUID NOT NULL,
    "inventoryId" UUID NOT NULL,

    CONSTRAINT "InventoryItem_pkey" PRIMARY KEY ("inventoryId","itemId")
);

-- CreateTable
CREATE TABLE "Shop" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "campaignId" UUID NOT NULL,
    "inventoryId" UUID NOT NULL,

    CONSTRAINT "Shop_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_username_key" ON "Users"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Characters_inventoryId_key" ON "Characters"("inventoryId");

-- CreateIndex
CREATE UNIQUE INDEX "CampaignUsers_campaignId_userId_key" ON "CampaignUsers"("campaignId", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "InventoryItem_inventoryId_itemId_key" ON "InventoryItem"("inventoryId", "itemId");

-- CreateIndex
CREATE UNIQUE INDEX "Shop_inventoryId_key" ON "Shop"("inventoryId");

-- AddForeignKey
ALTER TABLE "Characters" ADD CONSTRAINT "Characters_campaignId_fkey" FOREIGN KEY ("campaignId") REFERENCES "Campaigns"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Characters" ADD CONSTRAINT "Characters_inventoryId_fkey" FOREIGN KEY ("inventoryId") REFERENCES "Inventory"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CampaignUsers" ADD CONSTRAINT "CampaignUsers_campaignId_fkey" FOREIGN KEY ("campaignId") REFERENCES "Campaigns"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CampaignUsers" ADD CONSTRAINT "CampaignUsers_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "Users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InventoryItem" ADD CONSTRAINT "InventoryItem_inventoryId_fkey" FOREIGN KEY ("inventoryId") REFERENCES "Inventory"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InventoryItem" ADD CONSTRAINT "InventoryItem_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Shop" ADD CONSTRAINT "Shop_campaignId_fkey" FOREIGN KEY ("campaignId") REFERENCES "Campaigns"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Shop" ADD CONSTRAINT "Shop_inventoryId_fkey" FOREIGN KEY ("inventoryId") REFERENCES "Inventory"("id") ON DELETE CASCADE ON UPDATE CASCADE;

/*
  Warnings:

  - The primary key for the `InventoryItem` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `copperCost` on the `Item` table. All the data in the column will be lost.
  - You are about to drop the column `goldCost` on the `Item` table. All the data in the column will be lost.
  - You are about to drop the column `silverCost` on the `Item` table. All the data in the column will be lost.
  - The required column `inventoryItemId` was added to the `InventoryItem` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Made the column `goldValue` on table `Item` required. This step will fail if there are existing NULL values in that column.
  - Made the column `silverValue` on table `Item` required. This step will fail if there are existing NULL values in that column.
  - Made the column `copperValue` on table `Item` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "InventoryItem" DROP CONSTRAINT "InventoryItem_pkey",
ADD COLUMN     "OverrideDescription" TEXT,
ADD COLUMN     "inventoryItemId" UUID NOT NULL,
ADD COLUMN     "overrideName" TEXT,
ADD COLUMN     "overrideType" "ItemType",
ADD COLUMN     "overrideValue" INTEGER,
ADD COLUMN     "quantity" INTEGER,
ADD CONSTRAINT "InventoryItem_pkey" PRIMARY KEY ("inventoryItemId");

-- AlterTable
ALTER TABLE "Item" DROP COLUMN "copperCost",
DROP COLUMN "goldCost",
DROP COLUMN "silverCost",
ALTER COLUMN "goldValue" SET NOT NULL,
ALTER COLUMN "goldValue" SET DEFAULT 0,
ALTER COLUMN "silverValue" SET NOT NULL,
ALTER COLUMN "silverValue" SET DEFAULT 0,
ALTER COLUMN "copperValue" SET NOT NULL,
ALTER COLUMN "copperValue" SET DEFAULT 0;

-- CreateTable
CREATE TABLE "Tag" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "color" TEXT NOT NULL,

    CONSTRAINT "Tag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ItemToTags" (
    "A" UUID NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_InventoryItemToTags" (
    "A" UUID NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ItemToTags_AB_unique" ON "_ItemToTags"("A", "B");

-- CreateIndex
CREATE INDEX "_ItemToTags_B_index" ON "_ItemToTags"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_InventoryItemToTags_AB_unique" ON "_InventoryItemToTags"("A", "B");

-- CreateIndex
CREATE INDEX "_InventoryItemToTags_B_index" ON "_InventoryItemToTags"("B");

-- AddForeignKey
ALTER TABLE "_ItemToTags" ADD CONSTRAINT "_ItemToTags_A_fkey" FOREIGN KEY ("A") REFERENCES "Item"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ItemToTags" ADD CONSTRAINT "_ItemToTags_B_fkey" FOREIGN KEY ("B") REFERENCES "Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_InventoryItemToTags" ADD CONSTRAINT "_InventoryItemToTags_A_fkey" FOREIGN KEY ("A") REFERENCES "InventoryItem"("inventoryItemId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_InventoryItemToTags" ADD CONSTRAINT "_InventoryItemToTags_B_fkey" FOREIGN KEY ("B") REFERENCES "Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;

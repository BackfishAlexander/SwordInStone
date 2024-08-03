/*
  Warnings:

  - You are about to drop the column `Expertise` on the `Characters` table. All the data in the column will be lost.
  - You are about to drop the column `Proficiencies` on the `Characters` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Characters" DROP COLUMN "Expertise",
DROP COLUMN "Proficiencies",
ADD COLUMN     "expertise" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN     "proficiencies" TEXT[] DEFAULT ARRAY[]::TEXT[];

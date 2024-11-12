-- AlterTable
ALTER TABLE "Characters" ADD COLUMN     "Expertise" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN     "Proficiencies" TEXT[] DEFAULT ARRAY[]::TEXT[];

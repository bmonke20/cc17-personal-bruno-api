/*
  Warnings:

  - You are about to alter the column `productType` on the `product` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum(EnumId(0))`.

*/
-- AlterTable
ALTER TABLE `product` MODIFY `productType` ENUM('TOP', 'BOTTOM', 'ACCESSORIES') NOT NULL;

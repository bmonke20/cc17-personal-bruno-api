/*
  Warnings:

  - You are about to drop the column `paymentId` on the `order` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `order` DROP FOREIGN KEY `Order_paymentId_fkey`;

-- AlterTable
ALTER TABLE `order` DROP COLUMN `paymentId`;

-- AddForeignKey
ALTER TABLE `Payment` ADD CONSTRAINT `Payment_orderId_fkey` FOREIGN KEY (`orderId`) REFERENCES `Order`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

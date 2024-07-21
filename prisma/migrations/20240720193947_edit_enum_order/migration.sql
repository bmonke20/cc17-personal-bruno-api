/*
  Warnings:

  - The values [APPROVE] on the enum `Order_status` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `order` MODIFY `status` ENUM('PENDING', 'SUCCESS', 'DECLINE') NOT NULL DEFAULT 'PENDING';

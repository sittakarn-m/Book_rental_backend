/*
  Warnings:

  - You are about to drop the `bookoncart` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `bookId` to the `Rental` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `bookoncart` DROP FOREIGN KEY `BookOnCart_bookId_fkey`;

-- DropForeignKey
ALTER TABLE `bookoncart` DROP FOREIGN KEY `BookOnCart_cartId_fkey`;

-- AlterTable
ALTER TABLE `bookonrental` ADD COLUMN `cartId` INTEGER NULL;

-- AlterTable
ALTER TABLE `rental` ADD COLUMN `bookId` INTEGER NOT NULL;

-- DropTable
DROP TABLE `bookoncart`;

-- AddForeignKey
ALTER TABLE `Rental` ADD CONSTRAINT `Rental_bookId_fkey` FOREIGN KEY (`bookId`) REFERENCES `Book`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `BookOnRental` ADD CONSTRAINT `BookOnRental_cartId_fkey` FOREIGN KEY (`cartId`) REFERENCES `Cart`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

/*
  Warnings:

  - You are about to drop the column `cartId` on the `bookonrental` table. All the data in the column will be lost.
  - You are about to drop the column `bookId` on the `rental` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `bookonrental` DROP FOREIGN KEY `BookOnRental_cartId_fkey`;

-- DropForeignKey
ALTER TABLE `rental` DROP FOREIGN KEY `Rental_bookId_fkey`;

-- DropIndex
DROP INDEX `BookOnRental_cartId_fkey` ON `bookonrental`;

-- DropIndex
DROP INDEX `Rental_bookId_fkey` ON `rental`;

-- AlterTable
ALTER TABLE `bookonrental` DROP COLUMN `cartId`;

-- AlterTable
ALTER TABLE `rental` DROP COLUMN `bookId`;

-- CreateTable
CREATE TABLE `BookOnCart` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `count` INTEGER NOT NULL,
    `price` DOUBLE NOT NULL,
    `cartId` INTEGER NOT NULL,
    `bookId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `BookOnCart` ADD CONSTRAINT `BookOnCart_cartId_fkey` FOREIGN KEY (`cartId`) REFERENCES `Cart`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `BookOnCart` ADD CONSTRAINT `BookOnCart_bookId_fkey` FOREIGN KEY (`bookId`) REFERENCES `Book`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

/*
  Warnings:

  - You are about to drop the column `price` on the `rental` table. All the data in the column will be lost.
  - You are about to drop the `bookoncart` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `totalPrice` to the `Rental` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `bookoncart` DROP FOREIGN KEY `BookOnCart_bookId_fkey`;

-- DropForeignKey
ALTER TABLE `bookoncart` DROP FOREIGN KEY `BookOnCart_cartId_fkey`;

-- AlterTable
ALTER TABLE `rental` DROP COLUMN `price`,
    ADD COLUMN `totalPrice` DOUBLE NOT NULL;

-- AlterTable
ALTER TABLE `user` ADD COLUMN `deletedAt` DATETIME(3) NULL;

-- DropTable
DROP TABLE `bookoncart`;

-- CreateTable
CREATE TABLE `BookOnRental` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `count` INTEGER NOT NULL,
    `price` DOUBLE NOT NULL,
    `rentalId` INTEGER NOT NULL,
    `bookId` INTEGER NOT NULL,
    `cartId` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `BookOnRental` ADD CONSTRAINT `BookOnRental_rentalId_fkey` FOREIGN KEY (`rentalId`) REFERENCES `Rental`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `BookOnRental` ADD CONSTRAINT `BookOnRental_bookId_fkey` FOREIGN KEY (`bookId`) REFERENCES `Book`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `BookOnRental` ADD CONSTRAINT `BookOnRental_cartId_fkey` FOREIGN KEY (`cartId`) REFERENCES `Cart`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

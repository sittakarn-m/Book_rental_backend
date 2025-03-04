/*
  Warnings:

  - You are about to drop the column `availability_status` on the `book` table. All the data in the column will be lost.
  - You are about to drop the column `genres_id` on the `book` table. All the data in the column will be lost.
  - You are about to drop the column `price_per_day` on the `book` table. All the data in the column will be lost.
  - You are about to drop the column `book_id` on the `rental` table. All the data in the column will be lost.
  - You are about to drop the column `rental_date` on the `rental` table. All the data in the column will be lost.
  - You are about to drop the column `return_date` on the `rental` table. All the data in the column will be lost.
  - You are about to alter the column `status` on the `rental` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum(EnumId(1))`.
  - You are about to drop the `genres` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `promotion` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `rentalpromotion` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `categoryId` to the `Book` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pricePerDay` to the `Book` table without a default value. This is not possible if the table is not empty.
  - Added the required column `bookId` to the `Rental` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `book` DROP FOREIGN KEY `Book_genres_id_fkey`;

-- DropForeignKey
ALTER TABLE `rental` DROP FOREIGN KEY `Rental_book_id_fkey`;

-- DropForeignKey
ALTER TABLE `rentalpromotion` DROP FOREIGN KEY `RentalPromotion_rental_id_fkey`;

-- DropForeignKey
ALTER TABLE `rentalpromotion` DROP FOREIGN KEY `RentalPromotion_rental_promotion_id_fkey`;

-- DropIndex
DROP INDEX `Book_genres_id_fkey` ON `book`;

-- DropIndex
DROP INDEX `Rental_book_id_fkey` ON `rental`;

-- AlterTable
ALTER TABLE `book` DROP COLUMN `availability_status`,
    DROP COLUMN `genres_id`,
    DROP COLUMN `price_per_day`,
    ADD COLUMN `categoryId` INTEGER NOT NULL,
    ADD COLUMN `coverImage` VARCHAR(191) NULL,
    ADD COLUMN `pricePerDay` DOUBLE NOT NULL,
    ADD COLUMN `status` ENUM('AVAILABLE', 'RENTED', 'RETURNING') NOT NULL DEFAULT 'AVAILABLE',
    ADD COLUMN `stock` INTEGER NOT NULL DEFAULT 1;

-- AlterTable
ALTER TABLE `rental` DROP COLUMN `book_id`,
    DROP COLUMN `rental_date`,
    DROP COLUMN `return_date`,
    ADD COLUMN `bookId` INTEGER NOT NULL,
    ADD COLUMN `rentalDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `returnDate` DATETIME(3) NULL,
    ADD COLUMN `trackingNumber` VARCHAR(191) NULL,
    MODIFY `status` ENUM('PENDING', 'ACTIVE', 'RETURNING', 'SUCCESS') NOT NULL DEFAULT 'PENDING';

-- AlterTable
ALTER TABLE `user` ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;

-- DropTable
DROP TABLE `genres`;

-- DropTable
DROP TABLE `promotion`;

-- DropTable
DROP TABLE `rentalpromotion`;

-- CreateTable
CREATE TABLE `Category` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Category_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Cart` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `cartTotal` DOUBLE NOT NULL,
    `orderedById` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `BookOnCart` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `count` INTEGER NOT NULL,
    `price` DOUBLE NOT NULL,
    `cartId` INTEGER NOT NULL,
    `bookId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Order` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `cartTotal` DOUBLE NOT NULL,
    `orderStatus` VARCHAR(191) NOT NULL DEFAULT 'Not process',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `orderedById` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `BookOnOrder` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `count` INTEGER NOT NULL,
    `price` DOUBLE NOT NULL,
    `bookId` INTEGER NOT NULL,
    `orderId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Image` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `asset_id` VARCHAR(191) NOT NULL,
    `public_id` VARCHAR(191) NOT NULL,
    `url` VARCHAR(191) NOT NULL,
    `secure_url` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Rental` ADD CONSTRAINT `Rental_bookId_fkey` FOREIGN KEY (`bookId`) REFERENCES `Book`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Book` ADD CONSTRAINT `Book_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `Category`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Cart` ADD CONSTRAINT `Cart_orderedById_fkey` FOREIGN KEY (`orderedById`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `BookOnCart` ADD CONSTRAINT `BookOnCart_cartId_fkey` FOREIGN KEY (`cartId`) REFERENCES `Cart`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `BookOnCart` ADD CONSTRAINT `BookOnCart_bookId_fkey` FOREIGN KEY (`bookId`) REFERENCES `Book`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Order` ADD CONSTRAINT `Order_orderedById_fkey` FOREIGN KEY (`orderedById`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `BookOnOrder` ADD CONSTRAINT `BookOnOrder_bookId_fkey` FOREIGN KEY (`bookId`) REFERENCES `Book`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `BookOnOrder` ADD CONSTRAINT `BookOnOrder_orderId_fkey` FOREIGN KEY (`orderId`) REFERENCES `Order`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

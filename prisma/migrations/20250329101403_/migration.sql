-- AlterTable
ALTER TABLE `rental` ADD COLUMN `orderId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Rental` ADD CONSTRAINT `Rental_orderId_fkey` FOREIGN KEY (`orderId`) REFERENCES `Order`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

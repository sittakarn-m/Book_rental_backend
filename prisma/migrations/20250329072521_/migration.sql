/*
  Warnings:

  - The values [RENTED,RETURNING] on the enum `Book_status` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `book` MODIFY `status` ENUM('AVAILABLE', 'UNAVAILABLE') NOT NULL DEFAULT 'AVAILABLE';

-- AlterTable
ALTER TABLE `rental` MODIFY `status` ENUM('ONSHELF', 'ONORDER', 'PENDING', 'ACTIVE', 'RETURNING', 'SUCCESS') NOT NULL DEFAULT 'ONSHELF';

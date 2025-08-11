/*
  Warnings:

  - You are about to drop the column `quantity` on the `carts` table. All the data in the column will be lost.
  - You are about to drop the column `cartId` on the `products` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `products` DROP FOREIGN KEY `products_cartId_fkey`;

-- DropIndex
DROP INDEX `products_cartId_fkey` ON `products`;

-- AlterTable
ALTER TABLE `carts` DROP COLUMN `quantity`;

-- AlterTable
ALTER TABLE `products` DROP COLUMN `cartId`;

-- CreateTable
CREATE TABLE `products_in_carts` (
    `productId` INTEGER NOT NULL,
    `cartId` INTEGER NOT NULL,
    `quantity` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`productId`, `cartId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `products_in_carts` ADD CONSTRAINT `products_in_carts_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `products`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `products_in_carts` ADD CONSTRAINT `products_in_carts_cartId_fkey` FOREIGN KEY (`cartId`) REFERENCES `carts`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

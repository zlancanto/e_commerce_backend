-- DropForeignKey
ALTER TABLE `products_in_carts` DROP FOREIGN KEY `products_in_carts_cartId_fkey`;

-- DropForeignKey
ALTER TABLE `products_in_carts` DROP FOREIGN KEY `products_in_carts_productId_fkey`;

-- DropIndex
DROP INDEX `products_in_carts_cartId_fkey` ON `products_in_carts`;

-- AddForeignKey
ALTER TABLE `products_in_carts` ADD CONSTRAINT `products_in_carts_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `products`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `products_in_carts` ADD CONSTRAINT `products_in_carts_cartId_fkey` FOREIGN KEY (`cartId`) REFERENCES `carts`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

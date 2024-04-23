/*
  Warnings:

  - You are about to drop the column `portfolioId` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the `Portfolio` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `userId` to the `Transaction` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Portfolio` DROP FOREIGN KEY `Portfolio_userId_fkey`;

-- DropForeignKey
ALTER TABLE `Transaction` DROP FOREIGN KEY `Transaction_portfolioId_fkey`;

-- AlterTable
ALTER TABLE `Transaction` DROP COLUMN `portfolioId`,
    ADD COLUMN `userId` INTEGER NOT NULL;

-- DropTable
DROP TABLE `Portfolio`;

-- AddForeignKey
ALTER TABLE `Transaction` ADD CONSTRAINT `Transaction_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

/*
  Warnings:

  - You are about to alter the column `coinId` on the `Transaction` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.

*/
-- AlterTable
ALTER TABLE `Transaction` MODIFY `coinId` INTEGER NOT NULL;

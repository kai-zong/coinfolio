-- AlterTable
ALTER TABLE `Portfolio` ADD COLUMN `portfolioName` VARCHAR(191) NOT NULL DEFAULT 'My Portfolio';

-- AlterTable
ALTER TABLE `Transaction` MODIFY `coinImage` VARCHAR(191) NULL;

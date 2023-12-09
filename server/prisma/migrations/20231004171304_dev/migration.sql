-- AlterTable
ALTER TABLE `post` ADD COLUMN `group_id` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `post` ADD CONSTRAINT `post_group_id_fkey` FOREIGN KEY (`group_id`) REFERENCES `fb_group`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

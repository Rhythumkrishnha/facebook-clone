/*
  Warnings:

  - Added the required column `user_id` to the `save_post` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `save_post` ADD COLUMN `user_id` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `save_post` ADD CONSTRAINT `save_post_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

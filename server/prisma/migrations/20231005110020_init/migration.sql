/*
  Warnings:

  - You are about to drop the `event_participant` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `event_participant` DROP FOREIGN KEY `event_participant_event_id_fkey`;

-- DropForeignKey
ALTER TABLE `event_participant` DROP FOREIGN KEY `event_participant_user_id_fkey`;

-- DropTable
DROP TABLE `event_participant`;

-- CreateTable
CREATE TABLE `participant` (
    `id` VARCHAR(191) NOT NULL,
    `event_id` VARCHAR(191) NOT NULL,
    `user_id` VARCHAR(191) NOT NULL,
    `status` ENUM('interested', 'going', 'not_interested') NOT NULL DEFAULT 'going',

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `participant` ADD CONSTRAINT `participant_event_id_fkey` FOREIGN KEY (`event_id`) REFERENCES `event`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `participant` ADD CONSTRAINT `participant_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

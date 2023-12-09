/*
  Warnings:

  - You are about to drop the column `followerId` on the `Friend` table. All the data in the column will be lost.
  - You are about to drop the column `followingId` on the `Friend` table. All the data in the column will be lost.
  - You are about to drop the column `authorId` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `photo` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `video` on the `Post` table. All the data in the column will be lost.
  - Added the required column `follower_id` to the `Friend` table without a default value. This is not possible if the table is not empty.
  - Added the required column `following_id` to the `Friend` table without a default value. This is not possible if the table is not empty.
  - Added the required column `author_id` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Post` DROP FOREIGN KEY `Post_authorId_fkey`;

-- AlterTable
ALTER TABLE `Friend` DROP COLUMN `followerId`,
    DROP COLUMN `followingId`,
    ADD COLUMN `follower_id` VARCHAR(191) NOT NULL,
    ADD COLUMN `following_id` VARCHAR(191) NOT NULL,
    MODIFY `status` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `Post` DROP COLUMN `authorId`,
    DROP COLUMN `createdAt`,
    DROP COLUMN `photo`,
    DROP COLUMN `video`,
    ADD COLUMN `author_id` VARCHAR(191) NOT NULL,
    ADD COLUMN `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `photo_url` VARCHAR(191) NULL,
    ADD COLUMN `video_url` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `Post` ADD CONSTRAINT `Post_author_id_fkey` FOREIGN KEY (`author_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

/*
  Warnings:

  - You are about to drop the column `cover_photo_url` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `profile_photo_url` on the `user` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `user` DROP COLUMN `cover_photo_url`,
    DROP COLUMN `profile_photo_url`,
    ADD COLUMN `cover_photo` VARCHAR(191) NULL,
    ADD COLUMN `profile_photo` VARCHAR(191) NULL;

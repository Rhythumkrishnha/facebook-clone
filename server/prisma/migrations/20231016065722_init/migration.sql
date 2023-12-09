/*
  Warnings:

  - Added the required column `content` to the `post_comment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `post_comment` ADD COLUMN `content` VARCHAR(191) NOT NULL;

-- CreateTable
CREATE TABLE `comment_like` (
    `id` VARCHAR(191) NOT NULL,
    `user_id` VARCHAR(191) NOT NULL,
    `comment_id` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `comment_like` ADD CONSTRAINT `comment_like_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `comment_like` ADD CONSTRAINT `comment_like_comment_id_fkey` FOREIGN KEY (`comment_id`) REFERENCES `post_comment`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

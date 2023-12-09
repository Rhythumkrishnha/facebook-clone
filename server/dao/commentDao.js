const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

class CommentDao {
  async createPostComment(content, post_id, user_id, parent_comment_id) {
    try {
      const comment = await prisma.post_comment.create({
        data: {
          content,
          post_id,
          user_id,
          parent_comment_id,
        },
      });
      return comment;
    } catch (error) {
      throw error;
    }
  }

  async getPostComments(post_id) {
    try {
      const comments = await prisma.post_comment.findMany({
        where: {
          post_id,
        },
      });
      return comments;
    } catch (error) {
      throw error;
    }
  }

  async createCommentLike(user_id, comment_id) {
    try {
      const like = await prisma.comment_like.create({
        data: {
          user_id,
          comment_id,
        },
      });

      return like;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new CommentDao();

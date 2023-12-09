const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

class LikeDao {
  async createPostLike(post_id, user_id) {
    try {
      const like = await prisma.post_like.create({
        data: {
          post_id,
          user_id,
        },
      });
      return like;
    } catch (error) {
      throw error;
    }
  }

  async getPostLikes(post_id) {
    try {
      const postLikes = await prisma.post_like.findMany({
        where: {
          post_id,
        },
      });

      return postLikes;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new LikeDao();

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

class PostDao {
  async getPostById(post_id) {
    try {
      const post = await prisma.post.findFirst({
        where: {
          id: post_id,
        },
        include: {
          comment: true,
          like: true,
          tag: true,
        },
      });
      return post;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async getPostByUserId(author_id) {
    try {
      const posts = await prisma.post.findMany({
        where: {
          author_id,
        },
        include: {
          author: {
            select: {
              name: true,
              profile_photo: true,
            }
          },
          tag: true,
        },
      });
      return posts;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async createPost(content, path, author_id) {
    try {
      const post = await prisma.post.create({
        data: {
          photo_url: path,
          content: content,
          author_id,
        },
      });
      return post;
    } catch (error) {
      throw error;
    }
  }

  async tagUser(post_id, user_id) {
    try {
      const tag = await prisma.post_tag.create({
        data: {
          post_id,
          user_id,
        },
      });

      return tag;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new PostDao();

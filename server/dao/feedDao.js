const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

class FeedDao {
  async fetchFeed() {
    try {
      const feed = await prisma.post.findMany({
        include: {
          author: {
            select: {
              id: true,
              name: true,
              profile_photo: true,
            },
          },
        },
        orderBy: {
          created_at: "desc",
        }
      });

      return feed;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new FeedDao();

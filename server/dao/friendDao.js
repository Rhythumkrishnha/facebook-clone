const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

class FriendDao {
  async createFriendRequest(follower_id, following_id) {
    try {
      const request = await prisma.friend.create({
        data: {
          follower_id,
          following_id,
        },
      });
      return request;
    } catch (error) {
      throw error;
    }
  }

  async getFriendRequests(following_id) {
    const request = await prisma.friend.findMany({
      where: {
        following_id,
        status: false,
      },
      select: {
        id: true,
        follower_id: true,
      },
    });
    return request;
  }

  async acceptFriendRequest(follower_id, following_id) {
    try {
      const findFriendRequestId = await prisma.friend.findFirst({
        where: {
          follower_id,
          following_id,
        },
        select: {
          id: true,
        },
      });
      console.log(findFriendRequestId);
      const request = await prisma.friend.update({
        where: {
          id: findFriendRequestId.id,
        },
        data: {
          status: true,
        },
      });
      return request;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async checkFriendRequest(userId1, userId2) {
    try {
      const data1 = await prisma.friend.findFirst({
        where: {
          follower_id: userId1,
          following_id: userId2,
        },
      });
      if (data1) {
        return data1;
      }
      const data2 = await prisma.friend.findFirst({
        where: {
          follower_id: userId2,
          following_id: userId1,
        },
      });

      return data2;
    } catch (error) {
      throw error;
    }
  }

  async getFriendList(userId) {
    try {
      const friendList1 = await prisma.friend.findMany({
        where: {
          follower_id: userId,
          status: true,
        },
        select: {
          following_id: true,
        },
      });
      const friendList2 = await prisma.friend.findMany({
        where: {
          following_id: userId,
          status: true,
        },
        select: {
          follower_id: true,
        },
      });

      const friends = [];
      for (let obj of friendList1) {
        friends.push(obj.following_id);
      }
      for (let obj of friendList2) {
        friends.push(obj.follower_id);
      }

      return friends;
    } catch (error) {
      throw error;
    }
  }

  async deleteFriendRequest(follower_id, following_id) {
    try {
      const requestId = await prisma.friend.findFirst({
        where: {
          follower_id,
          following_id,
        },
      });

      if (requestId) {
        await prisma.friend.delete({
          where: {
            id: requestId.id,
          },
        });
      }
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new FriendDao();

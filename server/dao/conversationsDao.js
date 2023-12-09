const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

class ConversationsDao {
  async getAllConversation(userId) {
    const data1 = await prisma.chat.findMany({
      where: {
        sender_id: userId,
      },
      select: {
        receiver_id: true,
      },
    });

    const data2 = await prisma.chat.findMany({
      where: {
        receiver_id: userId,
      },
      select: {
        sender_id: true,
      },
    });

    const set = new Set();

    for (let obj of data1) {
      set.add(obj.receiver_id);
    }

    for (let obj of data2) {
      set.add(obj.sender_id);
    }

    console.log(set);
    return Array.from(set);
  }
}

module.exports = new ConversationsDao();

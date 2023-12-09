const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

class MessageDao {
  async createMessage({ sender_id, receiver_id, message }) {
    try {
      const chat = await prisma.chat.create({
        data: {
          sender_id,
          receiver_id,
          message,
        },
      });

      return chat;
    } catch (error) {
      throw error;
    }
  }

  async getMessages(member1, member2) {
    try {
      const message1 = await prisma.chat.findMany({
        where: {
          sender_id: member1,
          receiver_id: member2,
        },
      }); 

      const message2 = await prisma.chat.findMany({
        where: {
          sender_id: member2,
          receiver_id: member1,
        },
      });

      return [message1, message2];
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new MessageDao();

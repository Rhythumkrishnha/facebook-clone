const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const dotenv = require("dotenv").config();
const bcrypt = require("bcrypt");

const saltRounds = process.env.SALT_ROUNDS;

class ProfileDao {
  async getUserProfile(id) {
    try {
      const profile = await prisma.user.findFirst({
        where: {
          id,
        },
      });

      return profile;
    } catch (error) {
      throw error;
    }
  }

  async updateProfile(userId, { name, email, contact, bio }, cover_photo, profile_photo) {
    try {
      const profile = await prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          name,
          email,
          contact: parseInt(contact),
          bio,
          cover_photo,
          profile_photo,
        },
      });

      return profile;
    } catch (error) {
      console.log(error);
      console.log(error);
      throw error;
    }
  }
}

module.exports = new ProfileDao();

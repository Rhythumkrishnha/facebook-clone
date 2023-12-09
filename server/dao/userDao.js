const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");
const saltRounds = process.env.SALT_ROUNDS;

class UserDao {
  async findUsername(username) {
    try {
      const res = await prisma.user.findFirst({
        where: {
          username: username,
        },
      });

      return res;
    } catch (error) {
      throw error;
    }
  }

  async register(userData) {
    try {
      const password = await bcrypt.hash(userData.password, Number(saltRounds));

      const user = await prisma.user.create({
        data: {
          name: userData.name,
          username: userData.username,
          password,
          profile_photo:
            "https://res.cloudinary.com/ddqhaqa61/image/upload/v1701528215/blank-profile-picture-973460_1280_sepbin.webp",
        },
      }); 

      return user;
    } catch (error) {
      throw error;
    }
  }

  async login(username, password) {
    try {
      const user = await prisma.user.findUnique({
        where: {
          username,
        },
      });

      if (user) {
        const result = await bcrypt.compare(password, user.password);
        if (result) {
          return {
            status: true,
            message: "Login successful",
            user,
          };
        } else {
          return {
            status: false,
            message: "Enter correct password",
          };
        }
      }

      return {
        status: false,
        message: "User does not exist",
      };
    } catch (error) {
      throw error;
    }
  }

  async getAllUsers() {
    try {
      const users = await prisma.user.findMany();
      return users;
    } catch (error) {
      throw error;
    }
  }

  async findUserById(id) {
    try {
      const user = await prisma.user.findFirst({
        where: {
          id,
        },
        select: {
          id: true,
          name: true,
          profile_photo: true,
        },
      });
      return user;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new UserDao();

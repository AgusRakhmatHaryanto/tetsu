const userRepository = require("../repositories/userRepository");
const { hashPassword, comparePassword } = require("../utils/hashPassword");
const {
  uploadToCloudinary,
  deleteFromCloudinary,
} = require("../utils/cloudinaryHandler");
const bcrypt = require("bcrypt");
const { generateToken } = require("../utils/jwt");

const create = async (data, file) => {
  try {
    const hashedPassword = await hashPassword(data.password);
    if (file) {
      const result = await uploadToCloudinary(file);
      data.avatarUrl = result.secure_url;
      data.imgId = result.public_id;
    }
    data.password = hashedPassword;

    const user = await userRepository.createUser(data);

    return user;
  } catch (error) {
    throw new Error("Error membuat user: " + error.message);
  }
};

const login = async (email, password) => {
  try {
    const user = await userRepository.getUserByEmail(email);
    if (!user) {
      throw new Error("User tidak ditemukan");
    }
    
    const isPasswordValid = await comparePassword(password, user.password);
    if (!isPasswordValid) {
      throw new Error("Password salah");
    }

    const token = await generateToken({
      id: user.id,
      role: user.role,
    });
    console.log(user);

    return {
      token,
      userId: user.id,
    };
  } catch (error) {
    throw new Error("Error login: " + error.message);
  }
};

const getAllUsers = async () => {
  try {
    return await userRepository.getAllUsers();
  } catch (error) {
    throw new Error("Error mendapatkan semua user: " + error.message);
  }
};

const getUserByEmail = async (email) => {
  try {
    return await userRepository.getUserByEmail(email);
  } catch (error) {
    throw new Error(
      "Error mendapatkan user berdasarkan email: " + error.message
    );
  }
};



const updateUser = async (id, data, file) => {
  try {
    let user = await userRepository.getUserById(id);
    if (!user) {
      throw new Error("User tidak ditemukan");
    }

    if (data.oldPassword && data.newPassword) {
      const isOldPasswordValid = await bcrypt.compare(
        data.oldPassword,
        user.password
      );
      if (!isOldPasswordValid) {
        throw new Error("Password lama tidak sesuai");
      }

      if (data.oldPassword === data.newPassword) {
        throw new Error("Password baru harus berbeda dengan password lama");
      }

      data.password = await bcrypt.hash(data.newPassword, 10);
    }
    delete data.newPassword;

    if (file) {
      const result = await uploadToCloudinary(file);
      data.avatarUrl = result.secure_url;
      data.imgId = result.public_id;
    }

    return await userRepository.updateUser(id, data);
  } catch (error) {
    throw new Error("Error mengupdate user: " + error.message);
  }
};

const getUserById = async (id) => {
  try {
    return await userRepository.getUserById(id);
  } catch (error) {
    throw new Error("Error mendapatkan user berdasarkan id: " + error.message);
  }
};

const deleteUser = async (id) => {
  try {
    const user = await userRepository.getUserById(id);
    if (user.imgId) {
      await deleteFromCloudinary(user.imgId);
    }
    return await userRepository.deleteUser(id);
  } catch (error) {
    throw new Error("Error menghapus user: " + error.message);
  }
};

module.exports = {
  create,
  login,
  getAllUsers,
  getUserByEmail,
  updateUser,
  getUserById,
  deleteUser,
};

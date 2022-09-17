/* eslint-disable no-underscore-dangle */
/* eslint-disable no-useless-catch */
const User = require('./user.model');
/**
 * Get all users
 * @returns all users
 */

async function getAllUsers() {
  try {
    const users = await User.find();
    return users;
  } catch (error) {
    throw error;
  }
}

async function getUserById(id) {
  try {
    const user = await User.findById(id).populate('marketId');
    return user;
  } catch (error) {
    throw error;
  }
}

async function createUser(user) {
  try {
    const newUser = await User.create(user);

    return newUser;
  } catch (error) {
    throw error;
  }
}

async function updateUser(id, user) {
  try {
    const updatedUser = await User.findByIdAndUpdate(id, user);
    return updatedUser;
  } catch (error) {
    throw error;
  }
}

async function deleteUser(id) {
  try {
    const deletedUser = await User.findByIdAndDelete(id);
    return deletedUser;
  } catch (error) {
    throw error;
  }
}
async function getUserByEmail(email) {
  try {
    const user = await User.findOne({ email });
    return user;
  } catch (error) {
    throw error;
  }
}

async function findOneUser(query) {
  const user = await User.findOne(query);
  return user;
}

async function ValidateUserEmail(email) {
  try {
    const isMatch = await User.findOne({ email });
    if (isMatch) {
      return true;
    }
    return false;
  } catch (error) {
    throw error;
  }
}
async function ValidateUserName(username) {
  try {
    const isMatch = await User.findOne({ username });
    if (isMatch) {
      return true;
    }
    return false;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  getUserByEmail,
  findOneUser,
  ValidateUserEmail,
  ValidateUserName,
};

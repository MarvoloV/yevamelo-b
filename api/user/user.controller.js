const crypto = require('crypto');
const {
  getAllUsers,
  createUser,
  deleteUser,
  getUserById,
  updateUser,
  ValidateUserEmail,
  ValidateUserName,
} = require('./user.service');

async function getAllUsersHandler(req, res) {
  try {
    const users = await getAllUsers();

    if (users.length === 0) {
      return res.status(404).json({ message: 'no users found' });
    }

    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

async function createUserHandler(req, res) {
  try {
    const { email } = req.body;
    const matchUserEmail = await ValidateUserEmail(email);
    if (matchUserEmail) {
      return res.status(403).json({
        message: 'used email',
      });
    }
    // const matchUserName = await ValidateUserName(username);
    // if (matchUserName) {
    //   return res.status(403).json({
    //     message: 'used username',
    //   });
    // }
    const newUser = {
      ...req.body,
    };
    const hash = crypto
      .createHash('sha256')
      .update(newUser.email)
      .digest('hex');
    newUser.passwordResetToken = hash;
    newUser.passwordResetExpires = Date.now() + 3600000 * 24; // 24 hour
    const user = await createUser(newUser);
    console.log('🚀 ~ file: user.controller.js ~ line 51 ~ createUserHandler ~ user', user);
    return res.status(201).json(user.profile);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

async function getUserByIdHandler(req, res) {
  const { id } = req.params;
  try {
    const user = await getUserById(id);
    if (!user) {
      return res.status(404).json({ message: `user not found with id: ${id}` });
    }

    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

async function updateUserHandler(req, res) {
  const { id } = req.params;
  try {
    const user = await updateUser(id, req.body);

    if (!user) {
      return res.status(404).json({ message: `user not found with id: ${id}` });
    }

    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

async function deleteUserHandler(req, res) {
  const { id } = req.params;
  try {
    const user = await deleteUser(id);

    if (!user) {
      return res.status(404).json({ message: `user not found with id: ${id}` });
    }

    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
async function getUserMeHandler(req, res) {
  try {
    return res.status(200).json(req.user);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
}
module.exports = {
  getAllUsersHandler,
  createUserHandler,
  getUserByIdHandler,
  updateUserHandler,
  deleteUserHandler,
  getUserMeHandler,
};

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const config = require('../../config');

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      lowercase: true,
      required: [true, "can't be blank"],
      match: [/\S+@\S+\.\S+/, 'is invalid'],
      index: true,
      trim: true,
    },
    dni: {
      type: String,
      required: true,
    },
    store: {
      type: String,
      required: true,
    },
    cellphone: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    role: {
      type: String,
      default: 'user',
      enum: config.userRoles,
      required: true,
    },
    passwordResetToken: String,
    passwordResetExpires: Date,
  },
  {
    timestamps: true,
  },
);

userSchema.pre('save', async function (next) {
  const user = this;
  try {
    if (!user.isModified('password')) {
      return next();
    }
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(user.password, salt);
    user.password = hash;
  } catch (error) {
    next(error);
  }
});

userSchema.methods.comparePassword = async function comparePassword(candidatePassword) {
  try {
    const user = this;
    return await bcrypt.compare(candidatePassword, user.password);
  } catch (error) {
    console.log('🚀 ~ file: user.model.js ~ line 78 ~ comparePassword ~ error', error);
    throw error;
  }
};

userSchema.virtual('profile').get(function profile() {
  const { email, role } = this;
  return { role, email };
});

module.exports = mongoose.model('User', userSchema);

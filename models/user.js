const mongoose = require('mongoose');
// const validator = require('validator');

const userSchema = new mongoose.Schema({

  name: {
    type: String,
    required: false,
    minlength: 2,
    maxlength: 30,
    default: 'Жак-Ив Кусто',
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  email: {
    type: String,
    // validate: {
    //   validator: (v) => validator.isEmail(v),
    //   message: 'Неверный Email',
    // },
    required: true,
    unique: true,
  },
}, { versionKey: false });

// eslint-disable-next-line func-names
userSchema.methods.toJSON = function () {
  const user = this.toObject();
  delete user.password;

  return user;
};
module.exports = mongoose.model('user', userSchema);

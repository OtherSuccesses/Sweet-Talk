const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs')
var Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: [true, 'Username is required'],
    trim: true,
    // minlength: 8
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    trim: true,
    // minlength: 8
  },
  gender: {
    type: String,
    // required: [true, 'Gender is required'],
    maxlength: 1,
    default: ''
  },
  seeking: {
    type: String,
    // required: [true, 'User\'s "seeking" preference is required'],
    maxlength: 1,
    default: ''
  },
  age: {
    type: Number,
    // min: [18, 'You must be over 18 to register'],
    default: 19

  },
  img: {
    type: String,
    required: false,
    default: ' '
  },
  bio: {
    type: String,
    required: false,
    default: 'This user hasn\'t entered any information yet.'
  },
  rightSwipes: [
    {
      type: Schema.Types.ObjectId,
      ref: "User"
    }
  ],
  leftSwipes: [
    {
      type: Schema.Types.ObjectId,
      ref: "User"
    }
  ],
  matches: [
    {
      type: Schema.Types.ObjectId,
      ref: "User"
    }
  ]
});

// generating a hash
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

const User = module.exports = mongoose.model('User', userSchema);

const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const swipeSchema = new Schema({
  swiper: {
    type: String,
    unique: false,
    required: [true, 'Initiator is required']
  },
  swipee: {
    type: String,
    unique: false,
    required: [true, 'Username is required']
  },
  swipe: {
    type: Boolean,
    required: [true, 'Swipe value is required']
  }
});

const Swipe = module.exports = mongoose.model('Swipe', swipeSchema);

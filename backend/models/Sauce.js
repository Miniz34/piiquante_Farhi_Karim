const mongoose = require('mongoose');

const sauceSchema = mongoose.Schema({
  userId: { type: String, required: true },
  name: { type: String, required: true },
  manufacturer: { type: String, required: true },
  description: { type: String, required: true },
  mainPepper: { type: String, required: true },
  imageUrl: { type: String, required: true },
  heat: { type: Number, required: true },
  likes: { type: Number, required: false },
  dislikes: { type: Number, required: false },
  usersLiked: [{ type: String, required: false }],
  usersDisliked: [{ type: String, required: false }],
});

module.exports = mongoose.model('sauce', sauceSchema);


// const mongoose = require('mongoose');

// const thingSchema = mongoose.Schema({
//   title: { type: String, required: true },
//   description: { type: String, required: true },
//   imageUrl: { type: String, required: true },
//   userId: { type: String, required: true },
//   price: { type: Number, required: true },
// });

// module.exports = mongoose.model('Thing', thingSchema);
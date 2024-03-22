const mongoose = require('mongoose')


const googleSchema = new mongoose.Schema ({
    username: String,
    googleId: String,
    email: String
  });

  const google = mongoose.model('google',googleSchema);
  module.exports = google;
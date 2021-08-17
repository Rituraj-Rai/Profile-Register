const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    default: 0,
    min: 1,
    max: 1000,
  },
  gender: {
    type: String,
    required: true,
  },
  nationality: {
    type: String,
    required: true,
  },
  photo : {
    type: String,
    default: 'https://th.bing.com/th/id/R.f4d3451e2834d5a09ddc2a760cd36b25?rik=FIR%2fDphHW9yugA&riu=http%3a%2f%2fclipart-library.com%2fimages_k%2fwoman-silhouette-head%2fwoman-silhouette-head-22.png&ehk=aHLVPoiSPq0C8znu3nV7sPG3EWYgJ3f33T0x83kCOg4%3d&risl=&pid=ImgRaw&r=0'
  }
});

const User = mongoose.model('User',userSchema);

module.exports = User;
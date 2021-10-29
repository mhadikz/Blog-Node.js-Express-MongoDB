const mongoose = require('mongoose')
let schema = mongoose.Schema

const UserSchema = new schema({
   username: { type: String, require: true, lowercase: true, unique: true },
   password: { type: String, require: true },
   email: { type: String, require: true, lowercase: true, unique: true },
   userId: { type: String, require: true, unique: true }
},
  { collection: "User" })

const userModel = mongoose.model('user', UserSchema)

export default userModel

const mongoose = require('mongoose')
let schema = mongoose.Schema

const UserSchema = new schema(
   {
      username: { type: String, required: true, lowercase: true, unique: true },
      password: { type: String, required: true },
      email: { type: String, required: true, lowercase: true, unique: true },
      name: { type: String, required: true, lowercase: true },
      userId: { type: String, required: true, unique: true },
      createdAt: { type: Date, default: Date.now }
   },
   { collection: 'User' }
)

const userModel = mongoose.model('user', UserSchema)

export default userModel

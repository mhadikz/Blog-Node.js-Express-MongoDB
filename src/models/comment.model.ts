const mongoose = require('mongoose')
let schema = mongoose.Schema

const CommentSchema = new schema(
   {
      text: { type: String, require: true },
      author: { type: String, require: true, lowercase: true },
      email: { type: String, require: true, lowercase: true },
      createdAt: { type: Date, default: Date.now }
   },
   { collection: 'Comment' }
)

const commentModel = mongoose.model('comment', CommentSchema)

export default commentModel

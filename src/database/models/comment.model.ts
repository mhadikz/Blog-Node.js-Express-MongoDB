const mongoose = require('mongoose')
let schema = mongoose.Schema

const CommentSchema = new schema(
   {
      text: { type: String, required: true },
      author: { type: String, required: true, lowercase: true },
      email: { type: String, required: true, lowercase: true },
      createdAt: { type: Date, default: Date.now }
   },
   { collection: 'Comment' }
)

const commentModel = mongoose.model('comment', CommentSchema)

export default commentModel

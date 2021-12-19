const mongoose = require('mongoose')
let schema = mongoose.Schema

const PostSchema = new schema(
   {
      userId:{ type: String, required: true},
      title: { type: String, required: true, length: 100 },
      body: { type: String, required: true, length: 1000 },
      author: { type: String, required: true },
      comments: { type: Array },
      tags: { type: Array},
      categories: { type: Array},
      publishedAt: { type: Date, default: Date.now }
   },
   { collection: 'Post' }
)

const postModel = mongoose.model('post', PostSchema)

export default postModel

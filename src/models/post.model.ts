const mongoose = require('mongoose')
let schema = mongoose.Schema

const PostSchema = new schema(
   {
      userId:{ type: String, require: true},
      title: { type: String, require: true, length: 100 },
      body: { type: String, require: true, length: 1000 },
      author: { type: String, require: true },
      comments: { type: Array },
      tags: { type: Array},
      categories: { type: Array},
      publisheddAt: { type: Date, default: Date.now }
   },
   { collection: 'Post' }
)

const postModel = mongoose.model('post', PostSchema)

export default postModel

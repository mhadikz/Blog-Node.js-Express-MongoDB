const mongoose = require('mongoose')
let schema = mongoose.Schema

const CategorySchema = new schema(
   {
      name: { type: String, require: true },
      parentId: { type: Number, require: true },
      id: { type: Number, require: true},
      createdAt: { type: Date, default: Date.now }
   },
   { collection: 'Category' }
)

const categoryModel = mongoose.model('category', CategorySchema)

export default categoryModel

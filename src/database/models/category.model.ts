const mongoose = require('mongoose')
let schema = mongoose.Schema

const CategorySchema = new schema(
   {
      name: { type: String, required: true },
      parentId: { type: Number, required: true },
      id: { type: Number, required: true},
      createdAt: { type: Date, default: Date.now }
   },
   { collection: 'Category' }
)

const categoryModel = mongoose.model('category', CategorySchema)

export default categoryModel

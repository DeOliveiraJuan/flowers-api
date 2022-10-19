const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema(
    {
     name: {
        type: String,
        required: [true, 'Product name is required'],
        unique: [true, 'Product already exist']
     },
     price: {
        type: Number,
        required: [true, 'Product price is required']  
     },
     photos: {
        type: [String],
        default: ['https://cdn.vectorstock.com/i/1000x1000/89/10/pattern-with-tulips-vector-19608910.webp']
     },
     description: {
        type: String,
     }   
    },
{
    toJSON: {
        virtuals: true,
        transform: (doc, ret) => {
            delete ret.__v;
            delete ret._id;

            return ret
        }
    }
}
)

const Product = mongoose.model('Product', ProductSchema);

module.exports = Product
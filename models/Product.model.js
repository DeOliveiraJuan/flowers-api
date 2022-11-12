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
     images: {
        type: [String],
        default: ['https://cdn.thecolvinco.com/photos_cache_gallery/new-york/new-york-26a585cc-de9f-4d85-a9bb-d68088ffa6cb.jpg'],
        // required: [true, 'Product photo is required']  
     },
     description: {
        type: String,
     },
     isPlant: {
        type: Boolean,
        default: false
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
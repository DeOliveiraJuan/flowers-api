const mongoose = require('mongoose');

const ShoppingCartSchema = new mongoose.Schema(
    {
    user: {
         type: mongoose.Schema.Types.ObjectId,
         ref: 'User',
         required: true
    },
    products: [{
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            required: true,
        },
        units: {
            type: Number,
            min: 1,
            max: 99
        }
      }]
    },
    {
        toJSON: {
            virtuals: true,
            transform: (doc, ret) => {
                delete ret.__v;
    
                return ret
            }
        }
    }
)

const ShoppingCart = mongoose.model('ShoppingCart', ShoppingCartSchema);

module.exports = ShoppingCart
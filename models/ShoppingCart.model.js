const mongoose = require('mongoose');

const ShoppingCartSchema = new mongoose.Schema(
    {
    userId: {
         type: mongoose.Schema.Types.ObjectId,
         ref: 'User',
    },
    products: [{
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
        },
        qty: {
            type: Number,
            min: 1,
            max: 20
        }
      }]
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

const ShoppingCart = mongoose.model('ShoppingCart', ShoppingCartSchema);

module.exports = ShoppingCart
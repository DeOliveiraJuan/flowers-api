const mongoose = require('mongoose');

const ShippingAddressSchema = new mongoose.Schema(
        {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        street: {
            type: String,
        },
        streetNumber: {
            type: String,
        },
        floor: {
            type: String,
        },
        city: {
            type: String,
        },
        zipCode: {
            type: String,
        }
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

const ShippingAddress = mongoose.model('ShippingAddress', ShippingAddressSchema);

module.exports = ShippingAddress;
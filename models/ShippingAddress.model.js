const mongoose = require('mongoose');

const ShippingAddressSchema = new mongoose.Schema(
        {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        addressName: {
            type: String,
        },
        street: {
            type: String,
            required: [true, 'Street is required']
        },
        streetNumber: {
            type: String,
            required: [true, 'Street number is required']
        },
        floor: {
            type: String,
            required: [true, 'Floor is required']
        },
        door: {
            type: String,
            required: [true, 'Door is required']
        },
        city: {
            type: String,
            required: [true, 'City is required']
        },
        zipCode: {
            type: String,
            required: [true, 'Zip code is required']
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
import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    orderType: {
        type: String,
        enum: ['Adoption', 'Purchase'],
        required: true
    },


    products: [{
        product: {
            type: mongoose.Schema.ObjectId,
            ref: 'Product'
        },
        quantity: {
            type: Number,
            default: 1
        }
    }],
    totalPrice: Number,


    pet: {
        type: mongoose.Schema.ObjectId,
        ref: 'Pet'
    },
    status: {
        type: String,
        enum: ['pending', 'approved', 'rejected', 'delivered'],
        default: 'pending'
    },

    address: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    }
}, { timestamps: true });
export const orderModel = mongoose.model('Order', orderSchema);

import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        enum: ['Food', 'Accessories', 'Medicine'],
        required: true
    },
    images: [String],
    seller: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    stock: {
        type: Number,
        default: 0
    },
    isSubscribedProduct: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

export const shopModel = mongoose.model('Product', productSchema);

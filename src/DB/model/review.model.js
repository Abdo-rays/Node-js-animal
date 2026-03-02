import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
    content: {
        type: String,
        required: [true, 'Write Review']
    },
    rating: {
        type: Number,
        min: 1,
        max: 5,
        required: true
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    onModel: {
        type: String,
        required: true,
        enum: ['Pet', 'Product']
    },
    targetId: {
        type: mongoose.Schema.ObjectId,
        required: true,
        refPath: 'onModel'
    }
}, { timestamps: true });

export const reviewModel = mongoose.model('Review', reviewSchema);

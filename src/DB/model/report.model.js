import mongoose from 'mongoose';

const reportSchema = new mongoose.Schema({
    reason: {
        type: String,
        required: true
    },
    details: String,
    reporter: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    onModel: {
        type: String,
        required: true,
        enum: ['Pet', 'Product', 'User']
    },
    targetId: {
        type: mongoose.Schema.ObjectId,
        required: true,
        refPath: 'onModel'
    },
    status: {
        type: String,
        enum: ['pending', 'resolved'],
        default: 'pending'
    }
}, { timestamps: true });

export const reportModel = mongoose.model('Report', reportSchema);


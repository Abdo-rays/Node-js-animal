
import mongoose from 'mongoose';

const petSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Pet must have a name'],
        trim: true
    },
    species: {
        type: String,
        enum: ['dog', 'cat', 'bird', 'other'],
        required: true
    },
    breed: String,
    age: Number,
    gender:
    {
        type: String,
        enum: ['male', 'female']
    }
    ,
    description:
    {
        type: String,
        required: true
    },
    images: [String],
    healthStatus: String,
    isAdopted:
    {
        type: Boolean,
        default: false
    },
    owner: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: [true, 'Pet must belong to an owner']
    },
    wishlist: [{
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    }]
},

    { timestamps: true });


export const petModel = mongoose.model('Pet', petSchema);
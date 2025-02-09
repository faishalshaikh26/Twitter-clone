import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    fullName: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        minLength: 6
    },
    profileImg: {
        type: String,
        default: ''
    },
    coverImg: {
        type: String,
        default: ''
    },
    bio: {
        type: String,
        default: ''
    },
    link: {
        type: String,
        default: ''
    },
    following: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: []
    }],
    followers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: []
    }],
    
}, {
    timestamps: true
});

const User = mongoose.model('User', userSchema);

export default User
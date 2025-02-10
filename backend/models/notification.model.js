import mongoose from "mongoose";

const { Schema } = mongoose;

const notificationSchema = new Schema({
    from: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    to: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    type: {
        type: String,
        enum: ['follow', 'like'],
        required: true
    },
    read: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

const Notification = mongoose.model('Notification', notificationSchema);

export default Notification;
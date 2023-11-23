const mongoose = require('mongoose');


const commentSchema = new mongoose.Schema({
    post:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    },
    user:{
        type: String,
        required: true,
        maxLength: 50
    },
    comment:{
        type: String,
        required: true,
    },
    createdAt:{
        type: Date,
        default: Date.now(),
        required: true
    },
    updatedAt:{
        type: Date,
        default: Date.now(),
        required: true
    }
})

module.exports = mongoose.model('Comment', commentSchema);
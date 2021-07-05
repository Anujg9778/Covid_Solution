const mongoose = require('mongoose')

const Schema = mongoose.Schema

const commentSchema = new Schema({
    username: { type: String, required: true },
    comment: { type: String, required: true }
}, { timestamps: true })

const YourSpace = mongoose.model('YourSpace', commentSchema)

module.exports = YourSpace;
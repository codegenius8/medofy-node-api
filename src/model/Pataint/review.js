const mongoose = require('mongoose');

const schema = mongoose.Schema;
const { ObjectId } = mongoose.Schema.Types;

const userSchema = new schema({
    doctorId: { type: ObjectId, ref: 'doctor' },
    rating: { type: String, required: false },
    review: { type: String, required: false },
    addedBy: { type: ObjectId, ref: 'user' }
},
    { timestamps: true }
)

module.exports = mongoose.model("Review", userSchema);
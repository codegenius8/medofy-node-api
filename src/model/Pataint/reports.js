const mongoose = require('mongoose');

const schema = mongoose.Schema;
const { ObjectId } = mongoose.Schema.Types;

const userSchema = new schema({
    reportPdf: { type: String, required: false },
    reportImage: { type: String, required: false },
    type: { type: String, required: false},
    addedBy: { type: ObjectId, ref: 'user' }
},
    { timestamps: true }
)

module.exports = mongoose.model("Report", userSchema);
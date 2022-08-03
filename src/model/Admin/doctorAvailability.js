const mongoose = require('mongoose');

const schema = mongoose.Schema;
const { ObjectId } = mongoose.Schema.Types;

const availabilitySchema = new schema({
    name: { type: 'string', required: false },
},
    { timestamps: true }
)

module.exports = mongoose.model("doctorAvailablity", availabilitySchema);
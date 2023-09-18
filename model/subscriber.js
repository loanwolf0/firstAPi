const mongoose = require ('mongoose');

const subsSchema = new mongoose.Schema({
    name:{
        type: String,
        required:true
    },
    cost:{
        type: Number,
        required:true
    },
    date:{
        type: Date,
        required:true,
        default: Date.now
    }
})


module.exports = mongoose.model("subscriber" , subsSchema)
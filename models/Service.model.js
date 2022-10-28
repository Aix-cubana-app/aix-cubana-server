const { Schema, model } = require("mongoose");

const serviceSchema = new Schema({

    title: {
        type: String,
        required: [true, "Password is required."]
    },
    price: {
        type: Number,
        required: [true, "Password is required."]
    },
    style: {
        type: String,
        required: [true, "Password is required."]
    },
    level:  {
        type: String,
        enum: ["Beginner", "Middle", "Advance"],
        required: [true, "Password is required."]
    },
       
    teacher: { 
        type: Schema.Types.ObjectId, ref: 'User',
        require: [true, "You need to choose a teacher"] 
    }

})

const Service = model("Service", serviceSchema);

module.exports = Service;
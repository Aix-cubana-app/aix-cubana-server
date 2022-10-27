const { Schema, model } = require("mongoose");

const bookingSchema = new Schema({
    location: {
        type: String,
        required: [true, 'Location is required.'],
    },
    date: {
        type: String,
        required: [true, "Date is required"]
    }, 
    type: {
        type: String,
        enum: ["Private lessons", "Event"],
        required: [true, "Type of booking is required"]
    },   
    description: {
        type: String,
        required: [true, "You need to describe your event"]
    }, 
    payment: String,
    accepted: {
        type: Boolean,
        default: false
    },
    teacher: { 
        type: Schema.Types.ObjectId, ref: 'User',
        require: [true, "You need to choose a teacher"] 
    },
    owner: { 
        type: Schema.Types.ObjectId, ref: 'User'        
    }
})

const Booking = model("Booking", bookingSchema);

module.exports = Booking;
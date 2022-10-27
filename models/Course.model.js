const { Schema, model } = require("mongoose");

const courseSchema = new Schema({

    day: {
        type: String,
        enum: ["Mo","Tu","We","Th","Fr","Sa","Su"],
        required: [true, "You need to add the day"]
    },
    time: {
        type: String,
        required: [true, "You need to choose a time"]
    },
    title: {
        type: String,
        required: [true, "You need to add a Title"]
    },
    duration:{
        type: String,
        required: [true, "How long is the course going to last?"]
    }

})

const Course = model("Course", courseSchema);

module.exports = Course;
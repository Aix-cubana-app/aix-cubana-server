const { Schema, model } = require("mongoose");


const userSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, 'Email is required.'],
      unique: [true, 'Email is already in use'],
      match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address.'],
      lowercase: true,
      trim: true
    },
    password: {
      type: String,
      required: [true, "Password is required."],
    },
    name: {
      type: String,
      required: [true, "Name is required."],
    },
    _teacher: {
      type: Boolean,
      default: false
    },
    bookings: [{ type: Schema.Types.ObjectId, ref: 'Booking' }],       
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;

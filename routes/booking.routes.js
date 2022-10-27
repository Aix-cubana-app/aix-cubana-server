const express = require("express");
const router = express.Router();



const Booking = require("../models/Booking.model");
const User = require("../models/User.model")

// Require necessary (isAuthenticated) middleware in order to control access to specific routes
const { isAuthenticated } = require("../middleware/jwt.middleware.js");


const { populate } = require("../models/User.model");




// Route for creating a new booking
router.post("/create", isAuthenticated, (req, res, next) => {    

    const userId = req.payload._id;    

    let booking;

    const {location, date, type, description, payment, teacher } = req.body;

    Booking.create({location, date, type, description, payment, teacher, owner: userId}) 
    .then( newBooking => {       
       booking = newBooking;      
       return  User.findByIdAndUpdate( userId, {$push: {bookings: booking._id}})
    })
    .then( user => {        
        return  User.findByIdAndUpdate( teacher, {$push: {bookings: booking._id}})
    })     
    .catch(err => res.json(err));        

})

//Route to get Booking details
router.get("/details/:id", isAuthenticated, (req, res, next) => {
    
    const bookingId = req.params.id;  
      

    Booking.findById(bookingId)  
    .populate("teacher")
    .populate("owner")  
    .then( booking => {        
        res.status(200).json(booking);
    })
    .catch(err => res.json(err));

} )

//Route to get Booking details
router.put("/update/:id", isAuthenticated, (req, res, next) => {

    const userId = req.payload._id;
    const bookingId = req.params.id;
    const {location, date, type, description, payment, teacher } = req.body;

    Booking.findByIdAndUpdate(bookingId, {location, date, type, description, payment, teacher, owner: userId} )    
    .then( booking => {
        res.status(200).json(booking);
    })
    .catch(err => res.json(err));

} )


//Route to delete a booking
router.post("/delete/:id", isAuthenticated, (req, res, next) => {

    
    const bookingId = req.params.id;    

    Booking.findByIdAndDelete(bookingId)    
    .then( booking => {
        res.status(200).json(booking);
    })
    .catch(err => res.json(err));

} )




// GET /api/bookings  -  Get list of bookings of a teacher/user
router.get("/bookings", isAuthenticated, (req, res, next) => {

    const userId = req.payload._id;
    

    User.findById(userId)
    .populate("bookings")
    .then( user => {        
       res.status(200).json(user.bookings); 
    })    
    .catch()

})




module.exports = router;
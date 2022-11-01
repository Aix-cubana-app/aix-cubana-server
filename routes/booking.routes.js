const express = require("express");
const router = express.Router();



const Booking = require("../models/Booking.model");
const User = require("../models/User.model")

// Require necessary (isAuthenticated) middleware in order to control access to specific routes
const { isAuthenticated } = require("../middleware/jwt.middleware.js");


const { populate } = require("../models/User.model");




// Route for creating a new booking
router.post("/booking/create", isAuthenticated, (req, res, next) => {    

    const userId = req.payload._id;    

    let booking;

    const {location, date, service , description, teacher } = req.body;

    Booking.create({location, date, service, description, teacher, owner: userId}) 
    .then( newBooking => {       
       booking = newBooking;    
       res.status(200).json(newBooking);  
       return  User.findByIdAndUpdate( userId, {$push: {bookings: booking._id}})
    })
    .then( user => {
        
        return  User.findByIdAndUpdate( teacher, {$push: {teacherbookings: booking._id}})
    })
        
    .catch(err => res.json(err));        

})

//Route to get Booking details
router.get("/booking/details/:id", isAuthenticated, (req, res, next) => {
    
    const bookingId = req.params.id;  
      

    Booking.findById(bookingId)
    .select("-_id -password -email")  
    .populate("teacher", "-_id -password -email")
    .populate("owner", "-_id -password -email")  
    .populate("service")
    .then( booking => {        
        res.status(200).json(booking);
    })
    .catch(err => res.json(err));

} )

//Route to get update a Booking 
router.put("/booking/update/:id", isAuthenticated, (req, res, next) => {

    const userId = req.payload._id;
    const bookingId = req.params.id;
    const {location, date, service, description, teacher } = req.body;

    Booking.findByIdAndUpdate(bookingId, {location, date, service, description, teacher, owner: userId} )    
    .then( booking => {
        res.status(200).json(booking);
    })
    .catch(err => res.json(err));

} )


//Route to delete a booking
router.post("/booking/delete/:id", isAuthenticated, (req, res, next) => {

    
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
    .populate("teacherbookings")    
    .then( user => {      
       if(user.isTeacher){
          res.status(200).json({bookings: user.bookings, teacherbookings: user.teacherbookings}); 
       } else {
          res.status(200).json({bookings: user.bookings})
       }   
    })    
    .catch(err => res.json(err));


})




module.exports = router;
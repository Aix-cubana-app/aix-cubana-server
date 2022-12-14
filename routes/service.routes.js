const express = require("express");
const router = express.Router();

const Booking = require("../models/Booking.model");
const User = require("../models/User.model");
const Service = require("../models/Service.model");

// Require necessary (isAuthenticated) middleware in order to control access to specific routes
const { isAuthenticated } = require("../middleware/jwt.middleware.js");
const isTeacher = require("../middleware/isTeacher.js");


//Route for creating a new service

router.post("/service/", isAuthenticated, isTeacher,  (req, res, next) =>{    


    teacherId = req.payload._id;    

    const {title, price, style, level } = req.body;

    Service.create( {title, price, style, level, teacher: teacherId } )
    .then( service => {
        res.status(200).json(service)
    })
    .catch(err => res.json(err)); 

} )


//Route for getting service details

router.get("/service/:id", isAuthenticated, isTeacher, (req, res, next) =>{

    const serviceId = req.params.id;

    Service.findById(serviceId)    
    .then( service => {
        res.status(200).json(service)
    })
    .catch(err => res.json(err));    

} )

// Route to update a service
router.put("/service/:id", isAuthenticated, isTeacher, (req, res, next) =>{    


    teacherId = req.payload._id;    
    serviceId = req.params.id;

    const {title, price, style, level } = req.body;

    Service.findByIdAndUpdate( serviceId, {title, price, style, level, teacher: teacherId } )
    .then( updatedService => {
        res.status(200).json(updatedService)
    })
    .catch(err => res.json(err)); 

} )

//Route to get a Teacher services
router.get("/services/:id", isAuthenticated, (req, res, next) =>{

    const teachersId = req.params.id; 

    Service.find()
    .then( servicesArr => {
        
        const teacherServices = servicesArr.filter( service =>{           

            return service.teacher == teachersId;
            
        } )
        
        
        
        res.status(200).json(teacherServices);
    })
    .catch(err => res.json(err)); 

})



// Route to delete a service
 
router.delete("/service/:id", isAuthenticated, isTeacher, (req, res, next) =>{   
      
    serviceId = req.params.id;    
    

    Service.findByIdAndDelete( serviceId )
    .then( deletedService => {
        res.status(200).json(deletedService)
    })
    .catch(err => res.json(err)); 

} )













module.exports = router;
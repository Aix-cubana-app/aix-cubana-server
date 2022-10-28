
const isTeacher = (req, res, next) => {

    console.log("WE ARE INSIDE MIDDLEWARE"+req.payload.isTeacher);



    if(req.payload.isTeacher){
        next();
    } else {
        res.status(401).json({})
    }

}

module.exports = isTeacher;
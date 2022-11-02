
const isTeacher = (req, res, next) => {    



    if(req.payload.isTeacher){
        next();
    } else {
        res.status(401).json({})
    }

}

module.exports = isTeacher;
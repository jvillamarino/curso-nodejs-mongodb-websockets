const myLogger = (req, res, next) => {
    console.log('LOGGED - myLogger');
    next();
}

const registerRequestTime = (req, res, next) => {
    console.log('LOGGED - registerRequestTime');
    req.requestTime = Date.now();
    next();
}

const validateUser = (req, res, next) => {
    console.log('LOGGED - validateUser');
    const { User } = req.query;

    if (!User) {
        res.send(`Error, invalid user: ${User}`);
    } else {
        next();
    }

}


module.exports = {
    mdls: [myLogger, registerRequestTime, validateUser]

}
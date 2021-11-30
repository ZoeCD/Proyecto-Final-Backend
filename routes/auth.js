const router = require("express").Router();
const {
    loginFunction,
} = require("../src/auth.js");

const requiresAuth = (req, res, next) => {
    if ((req.body && req.body.owner) || (req.query && req.query.username)) {
        return next();
    }
    console.log(req.body, req.query);
    return res.status(401).json({ status: 401, error: "please log in" });
}

router.post('/login', loginFunction);


module.exports = {
    requiresAuth: requiresAuth,
    auth: router
}
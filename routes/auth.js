const { Router } = require("express");
const {
    callbackFunction,
    logoutFunction
} = require("../src/auth.js");

const requiresAuth = (req, res, next) => {
    if (req.session.userid) {
        return next();
    }
    req.session.origin = req.headers.referer;
    return res.redirect('/login');
}

const router = Router();
router.all('/', requiresAuth, (req, res) => res.json({ user: req.session.userid }));
router.all('/callback', callbackFunction);
router.all('/logout', logoutFunction);


module.exports = {
    requiresAuth: requiresAuth,
    auth: router
}
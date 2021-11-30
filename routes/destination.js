const router = require("express").Router();
const { post, get, put, del } = require("../controllers/destination.js");
const { requiresAuth } = require("./auth");
const {
    nameValidator,
    typeValidator,
    descriptionValidator,
    destinationValidator,
    idValidator,
    doneValidator } = require('../src/validators.js')

router.route('/api/destination/:id')
    .all([requiresAuth, (req, res, next) => {
        if (idValidator(req.params.id)) {
            return next();
        }
        return res.status(400).json({ status: 400, error: "Invalid id format" })
    }])
    .post([async (req, res, next) => {
        console.log(req.body);
        if (destinationValidator(req.body)) {
            return next();
        }
        return res.status(400).json({ status: 400, error: "Invalid id format" });
    }, post])
    .get(get)
    .put([async (req, res, next) => {
        if (nameValidator(req.body.name) ||
            typeValidator(req.body.type) ||
            descriptionValidator(req.body.description) ||
            doneValidator(req.body.done)) {
            return next();
        }
        return res.status(422).json({ status: 422, error: "Wrong body format, review documentation" });
    }, put])
    .delete(del)

router.route('/api/destination')
    .all(requiresAuth)
    .post([async (req, res, next) => {
        if (destinationValidator(req.body)) {
            return next();
        }
        return res.status(400).json({ status: 400, error: "Invalid destination fields" });
    }, post])
    .get(get)
    .put([async (req, res, next) => {
        if (
            idValidator(req.body.id) &&
            (
                nameValidator(req.body.name) ||
                typeValidator(req.body.type) ||
                descriptionValidator(req.body.description) ||
                doneValidator(req.body.done)
            )
        ) {
            return next();
        }
        return res.status(422).json({ status: 422, error: "Wrong body format, review documentation" });
    }, put])
    .delete([async (req, res, next) => {
        if (idValidator(req.body.id)) {
            return next();
        }
        return res.status(400).json({ status: 400, error: "Invalid id format" });
    }, del])

module.exports = router

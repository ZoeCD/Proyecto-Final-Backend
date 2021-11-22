const router = require("express").Router();
const { post, get, put, del } = require("../controllers/destination.js");
const {
    nameValidator,
    typeValidator,
    descriptionValidator,
    priceValidator,
    destinationValidator,
    idValidator, 
    doneValidator} = require('../src/validators.js')

router.route('/destination/:id')
    .all((req, res, next) => {
        if (idValidator(req.params.id)) {
            return next();
        }
        return res.status(400).json({ status: 400, error: "Invalid id format" })
    })
    .post([async (req, res, next) => {
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
        priceValidator(req.body.price) ||
        doneValidator(req.body.done)) {
            return next();
        }
        return res.status(422).json({ status: 422, error: "Wrong body format, review documentation" });
    }, put])
    .delete(del)

router.route('/destination')
    .all()
    .post([async (req, res, next) => {
        if (destinationValidator(req.body)) {
            return next();
        }
        return res.status(400).json({ status: 400, error: "Invalid id format" });
    }, post])
    .get(get)
    .put([async (req, res, next) => {
        if (
            idValidator(req.body.id) &&
            (
                nameValidator(req.body.name) ||
                typeValidator(req.body.type) ||
                descriptionValidator(req.body.description) ||
                priceValidator(req.body.price) ||
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

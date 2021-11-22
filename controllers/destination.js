const Destination = require("../models/destination")

module.exports = {
    post: async (req, res) => {
        new Destination(req.body)
            .save()
            .then(
                async (data, err) => {
                    if (err) {
                        return res.status(422).json({ status: 422, message: data, error: err });
                    }
                    return res.status(200).json({ status: 200, items: data });
                }
            )
    },

    get: async (req, res) => {
        if (req.params.id || req.body.id) {
            Destination.findById(
                req.params.id || req.body.id,
                async (data, err) => {
                    if (err) {
                        return res.status(422).json({ status: 422, message: data, error: err });
                    }
                    if (data.owner != req.session.userid){ 
                        return res.status(403).json({ status: 403, error: 'not your data' });
                    }
                    return res.status(200).json({ status: 200, items: data });
                }
            )
        } else {
            Destination.find({owner: req.session.userid},
                async (err, data) => {
                    if (err) {
                        return res.status(422).json({ status: 422, message: data, error: err });
                    }
                    return res.status(200).json({ status: 200, items: data });
                }
            )
        }
    },

    put: async (req, res) => {
        Destination.findById(
            req.params.id || req.body.id,
            async (data, err) => {
                if (err) {
                    return res.status(422).json({ status: 422, message: data, error: err });
                }
                if (data.owner != req.session.userid){ 
                    return res.status(403).json({ status: 403, error: 'not your data' });
                }
                data.update(req.body, async (data, err) => {
                    if (err) {
                        return res.status(422).json({ status: 422, message: data, error: err });
                    }
                    return res.status(200).json({ status: 200, items: data });
                })
            }
        )
    },

    del: async (req, res) => {
        Destination.findById(
            req.params.id || req.body.id,
            async (data, err) => {
                if (err) {
                    return res.status(422).json({ status: 422, message: data, error: err });
                }
                data.remove(async (data, err) => {
                    if (err) {
                        return res.status(422).json({ status: 422, message: data, error: err });
                    }
                    return res.status(200).json({ status: 200, items: data });
                })
            }
        )
    }
}
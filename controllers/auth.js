const { createHmac } = require('crypto');
const User = require("../models/user")

const loginFunction = async (req, res) => {
    try {
        if (req.body.password && req.body.username) {
            req.body.password = createHmac('sha256', process.env.PW_SECRET).update(req.body.password).digest('hex')
        }
        User.findOne({ username: req.body.username },
            async (err, data) => {
                if (err) {
                    return res.status(422).json({ status: 422, message: data, error: err });
                }
                console.log(data);
                if (data && data.password) {
                    if (data.password == req.body.password) {
                        return res.status(200).json({ status: 200, message: "logged in" });
                    }
                    return res.status(401).json({ status: 401, message: "wrong password" });
                }
                new User(req.body)
                    .save()
                    .then(
                        async (data, err) => {
                            if (err) {
                                return res.status(422).json({ status: 422, message: err });
                            }
                            console.log('created user');
                            return res.status(200).json({ status: 200, message: "signed up" });
                        }
                    );
            }
        )

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: `Internal Server Error: ${error}` });
    }
};

module.exports = {
    loginFunction
};
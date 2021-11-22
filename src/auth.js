const axios = require("axios"),
    jwt_decode = require("jwt-decode");


const loginFunction = async (req, res) => {
    const url =
        "https://signin.bindid-sandbox.io/authorize?" +
        "client_id=" +
        process.env.BINDID_CLIENT +
        "&redirect_uri=" +
        process.env.BASE_URL + '/callback' +
        "&state=" +
        (Math.random() * Math.pow(10, 11)) << 0 +
        "&bindid_custom_message=" +
        "Login bucketlist" +
        "&scope=bindid" +
        "&display=page" +
        "&prompt=login" +
        "&response_type=code";
    return res.redirect(url);
};

const callbackFunction = async (req, res) => {
    try {
        const params = new URLSearchParams();
        params.append("grant_type", "authorization_code");
        params.append("code", req.query.code);
        params.append("redirect_uri", process.env.redirectUri);
        params.append("client_id", process.env.clientId);
        params.append("client_secret", process.env.clientSecret);

        const tokenResponse = await axios({
            method: "post",
            url: "https://signin.bindid-sandbox.io/token",
            headers: {
                "content-type": "application/x-www-form-urlencoded"
            },
            data: params
        });

        const token = jwt_decode(tokenResponse.data.id_token);
        req.session.userid = token.sub;
        return res.redirect(req.session.origin || '/');
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: `Internal Server Error: ${error}` });
    }
};

const logoutFunction = async (req, res) => {
    if (req.user) {
        req.session.destroy();
        return res.redirect('/login');
    }
    return res.redirect('/');
};

module.exports = {
    loginFunction,
    callbackFunction,
    logoutFunction
};
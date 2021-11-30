const loginFunction = async (req, res) => {
    try {
        return res
            .cookie("username", req.body.username, {
                httpOnly: true,
                secure: false,
                maxAge: 64000
            })
            .redirect("/");
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: `Internal Server Error: ${error}` });
    }
};

module.exports = {
    loginFunction
};
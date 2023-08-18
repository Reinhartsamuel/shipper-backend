const { onRequest } = require("firebase-functions/v2/https");

exports.helloworld = onRequest(async (req, res) => {
    res.send("hello hello");
})
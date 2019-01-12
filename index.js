/**
 * SERVER that interacts with the Bitcoinaverage public API
 * https://apiv2.bitcoinaverage.com/
 */

//Server Boilerplate

const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const app = express();
app.use(bodyParser.urlencoded({
    extended: true
}));


//GET
app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html");
});

//POST
app.post("/", function (req, res) {
    var crypto, fiat, option;
    crypto = req.body.crypto;
    fiat = req.body.fiat;

    option = {
        url: "https://apiv2.bitcoinaverage.com/indices/global/ticker/",
        method: "GET",
        qs: {
            from: crypto,
            to: fiat,
            amount: req.body.amount
        },
    };

    request(option, function (error, response, body) {
        var data = JSON.parse(body);
        var price = data.price;

        console.log(price);

        res.send("<h1>Last price of " + crypto + ": " + data.last + " " + fiat + "</h1>");
    });
});

//Listener
app.listen(3000, function () {
    console.log("Server is running on port 3000");
});
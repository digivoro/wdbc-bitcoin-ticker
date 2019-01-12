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

    var crypto = req.body.crypto;
    var fiat = req.body.fiat;
    var amount = req.body.amount;

    var options = {
        url: "https://apiv2.bitcoinaverage.com/convert/global",
        method: "GET",
        qs: {
            from: crypto,
            to: fiat,
            amount: amount
        },
    };

    request(options, function (error, response, body) {

        var data = JSON.parse(body);
        var price = data.price; //Current price of the crypto

        console.log(price);

        var currentDate = data.time;

        res.write("<h1>Query result:</h1>");
        res.write("<p>The current date is " + currentDate + "</p>");
        res.write("<p><strong>" + amount + " " + crypto + "</strong> is currently worth <strong>" + price + " " + fiat + "</strong></p>")

        res.send();
    });
});

//Listener
app.listen(3000, function () {
    console.log("Server is running on port 3000");
});
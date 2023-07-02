const fs = require("fs");
const express = require("express");

var PORT = process.env.PORT || 8080
var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/public/assets", express.static(__dirname + "/public/assets"));

require("./routes/api-routes")(app);
require("./routes/html-routes")(app);

app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});


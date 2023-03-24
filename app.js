const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const users = require("./routes/users");
require("dotenv").config();
const port = process.env.PORT || 5000;
const app = express();
const path = require("path");

app.use(
	bodyParser.urlencoded({
		extended: false,
	})
);

app.use(bodyParser.json());
const db = process.env.MONGO_URI;
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true });
app.use("/api/users", users);

__dirname = path.resolve();
if (process.env.NODE_ENV === "production") {
	app.use(express.static(path.join(__dirname, "/client/build")));
	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
	});
} else {
	app.get("/", (req, res) => {
		res.send("API is running..");
	});
}

app.listen(port);

const express = require("express");
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
const cors = require("cors");
const app = express();

uri =
	"mongodb+srv://shubhdb:shubhdb123@cluster0.lnlki.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

app.use(cors());

mongoose.connect(
	uri,
	{
		useNewUrlParser: true,
		useUnifiedTopology: true,
	},
	(err) => {
		if (err) {
			console.log(`Not connected to db ${err}`);
		} else {
			console.log("Successfully connected to db");
		}
	}
);

app.use(bodyparser.json());
app.use("/posts", require("./routes/post"));

const port = process.env.port || 5000;

app.get("/", (req, res) => {
	res.send("MERN CRUD application");
});



app.listen(port, () => {
	console.log("Server is running on port 5000");
});

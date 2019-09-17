const express = require("express");
const app = express();
const mogoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const dotEnv = require("dotenv");

dotEnv.config();

// Connect with clouded database
mogoose.connect(process.env.MONGO_URL, { useNewUrlParser: true })
        .then(()=> console.log("DB Connected"));

mogoose.connection.on("error", err => {
   console.log(`DB connection error : ${err.message}`);
});


// Configure routes
const postRouter = require("./routes/postRouter");

// Middleware
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use("/", postRouter);


// App configures to listen port
const hostname = "localhost";
const port = process.env.PORT || 8080;
app.listen(port,()=>{
    console.log(`Server running at http://${hostname}:${port}`);
});
const express = require("express");
const app = express();
const mogoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
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
const authRouter = require("./routes/authRouter");

// Middleware
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cookieParser());
app.use("/", postRouter);
app.use("/", authRouter);



// App configures to listen port
const hostname = "localhost";
const port = process.env.PORT || 8080;
app.listen(port,()=>{
    console.log(`Server running at http://${hostname}:${port}`);
});
const express = require("express");
const app = express();
const mogoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const dotEnv = require("dotenv");
const cors = require("cors");

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
const userRouter = require("./routes/userRouter");

app.use(cors());
// Middleware
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cookieParser());
app.use("/", postRouter);
app.use("/", authRouter);
app.use("/", userRouter);
app.use(function(err, req, res, next){
    if(err.name === 'UnauthorizedError'){
        res.status(401).json({error: "UnauthorizedError"});
    }
});



// App configures to listen port
const hostname = "localhost";
const port = process.env.PORT || 8080;
app.listen(port,()=>{
    console.log(`Server running at http://${hostname}:${port}`);
});
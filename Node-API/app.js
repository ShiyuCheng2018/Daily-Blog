const express = require("express");
const app = express();
const morgan = require("morgan");


// Configure routes
const postRouter = require("./routes/postRouter");

// Middleware
app.use(morgan("dev"));
app.use("/", postRouter);


// App configures to listen port
const hostname = "localhost";
const port = 8080;
app.listen(port,()=>{
    console.log(`Server running at http://${hostname}:${port}`);
});
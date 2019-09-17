const express = require("express");
const app = express();
const hostname = "localhost";
const port = 8080;


app.get("/", (req, res) =>{
    res.send(" Hello, World from Node Server");
});

app.listen(port,()=>{
    console.log(`Server running at http://${hostname}:${port}`);
});
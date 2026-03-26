import express from "express"
import app from "./src/app.js"
const port=process.env.port||5000;
app.listen(port,()=>{
    console.log(`server is lostening at por${port}`)
});
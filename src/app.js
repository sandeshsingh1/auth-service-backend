import express from express
import dotenv from "dotenv"
import cors from "cors"
import cookieParser from "cookie-parser"
import authRoutes from "./routes/auth.routes.js"
dotenv.config();
const app=express();
//middlewares
app.use(express.json());
app.use(cors());
app.use(cookieParser());
// is middleware that tells Express to parse incoming application/x-www-form-urlencoded request bodies (the format used by HTML form submissions) and make the parsed data available in req.body.
app.use(express.urlencoded({extended:false}));
//routes
app.use("/api/auth",authRoutes);
app.get("/",(req,res)=>{
  res.send("Auth service is running");
})



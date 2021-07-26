import express from "express"
import cors from "cors"
import restaurants from "./api/restaurants.route.js" // user defined for project

const app = express();
app.use(cors()); // allows communication cross server
app.use(express.json()); //bodyparcer included i.e. json

app.use("/api/v1/restaurants",restaurants); //default url and route
app.use("*",(req,res)=> res.status(404).json({error: "Not Found"})); //default case throws status 400 with error messege in json

export default app; //default export since we can rename the import
// not possible with named export
//use export {myFunc as Calculator} for changing name convention

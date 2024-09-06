import mongoose from "mongoose";

export const connection =()=>{
    mongoose.connect(process.env.MONGO_URI,{
        dbName:"JOB_PORTAL_MERN"
    }
    ).then(()=>{
        console.log("Connected to MongoDB");
    }).catch(err=>{
        console.log(`Some Error occured while connecting to database: ${err}`);
    })
}
const express=require("express");
const axios=require("axios");
require("dotenv").config();

const app=express();
app.use(express.json());
app.use(cors);
const API_URL = "http://20.244.56.144/test/register";
const accessCode = process.env.access_Code;

if (!accessCode) {
    console.error("ERROR: Missing Access_code in .env file");
    process.exit(1);
}


app.post("/register", async(req,res)=>{
    try{
        const {companyName,ownerName,rollNo,ownerEmail,accessCode}=req.body;
        const existingUser = await User.findOne({ ownerEmail });
        if (existingUser) {
            return res.status(400).json({ error: "User already exists" });
        }

        const response=await axios.get(API_URL,{
            
            params:{
                
            }
        })
    }catch (error) {
        res.status(500).json({ error: "Server error", details: error.message });
    }




    
});




const axios = require('axios');
require("dotenv").config();

const url = "http://20.244.56.144/test/auth";

const data = {
    companyName: process.env.COMPANY_NAME,
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    ownerName: process.env.OWNER_NAME,
    ownerEmail: process.env.OWNER_EMAIL,
    rollNo: process.env.ROLL_NO
};

axios.post(url, data)
    .then(response => {
        console.log("Authorization Token Received:");
        console.log(response.data);
    })
    .catch(error => {
        console.error("Error:", error.response ? error.response.data : error.message);
    });

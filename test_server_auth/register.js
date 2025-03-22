const axios = require('axios');

const url = "http://20.244.56.144/test/register";

const data = {
    companyName: "Karpagam",
    ownerName: "Raghavendra",
    rollNo: "717822T146",
    ownerEmail: "717822t146@kce.ac.in",
    accessCode: "GEVSsY"
};


axios.post(url, data)
    .then(response => {
        console.log("Registration Successful:");
        console.log(response.data);
    })
    .catch(error => {
        console.error("Error:", error.response ? error.response.data : error.message);
    });

const express = require("express");
require('dotenv').config();
const cors = require("cors");
const bodyParser = require("body-parser");
var nodemailer = require('nodemailer');
var http = require('http');
var url = require('url');

// nodemon run 'nodemon ./server.js' for auto updates

const PORT = process.env.PORT || 9999;

const app = express();

var transporter = nodemailer.createTransport({
  service:'Gmail',
  auth: {
      user: process.env.EMAIL,
      pass: process.env.APPKEY
 }
});

app.use(cors());
app.use(bodyParser.json());


app.post("/interest", async (req, res) => {
  const data = req.body.data; // This will contain the JSON data sent in the request

  var receipt = {
    from: process.env.EMAIL,
    to: `${data.email}`,
    subject: 'Fanatical Detailing',
    html:`<p>Hey <strong>${data.firstName}</strong>,</p>
    <p>We're excited to set you up on a beautiful cruise onboard the SunSeeker</p>
    <p>If you haven't yet, feel free to call or text us at ${process.env.PHONE}.</p>
    <p>We look foward to chatting with you soon.</p>
    <p></br>Sincerely, Dolce Vita Charter Service</p>`
  }
  var loggingData = {
    from: process.env.EMAIL,
    to: process.env.EMAIL,
    subject: 'Fanatical Detailing (Interest Request)',
    html:`<p>Client Name: <strong>${data.firstName} ${data.lastName}</strong> </p>
    <p>Email: ${data.email}</p>
    <p>Phone: ${data.phone}</p>`
}

  transporter.sendMail(loggingData, function(error, info) {
    if (error) {
        console.log(error);
    } else {
        console.log('Email sent: ' + info.response)
    }
  })

  transporter.sendMail(receipt, function(error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response)
    }
})

  return res.json({'success':true}) 

});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

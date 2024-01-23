const express = require("express");
require('dotenv').config();
const cors = require("cors");
const bodyParser = require("body-parser");
var nodemailer = require('nodemailer');
var http = require('http');
var url = require('url');
const fs = require('fs');
const {google} = require('googleapis')
// nodemon run 'nodemon ./server.js' for auto updates
const { Client } = require('pg');

const PORT = process.env.PORT || 9999;

const app = express();

const oAuth2Client = new google.auth.OAuth2(process.env.GOOGLE_CLIENT_ID, process.env.GOOGLE_CLIENT_SECRET, process.env.GOOGLE_REDIRECT)

var transporter = nodemailer.createTransport({
  host: "ecngx348.inmotionhosting.com",
  port: "465",
  secure: true,
  auth: {
     user: "support@otimaweb.com", 
     pass: "850423Ab_INMOTION"
  }
});

app.use(cors());
app.use(bodyParser.json());

// const pool = new Client({
//   user: 'b9f34c5_Admin',
//   host: '198.46.91.127',
//   database: 'OTIMAWEB_admin',
//   password: '850423AbINMOTION',
//   port: 5432,
// });

// pool.connect((error) => {
//   if (error) {
//     console.error('Error connecting to the database', error);
//     pool.end(); // Close the pool if connection fails
//   } else {
//     console.log('Connected to the database');
    
//   }
// });


app.post("/api/interest", async (req, res) => {
  const data = req.body.data; // This will contain the JSON data sent in the request

const templatePath = './clientEmail.html';
const htmlTemplate = fs.readFileSync(templatePath, 'utf8');

// Replace dynamic data
const personalizedHtml = htmlTemplate.replace('/NAME/', data.firstName);


  var receipt = {
    from: process.env.EMAIL,
    to: `${data.email}`,
    subject: 'Otima Web Team',
    html:personalizedHtml
  }
  var loggingData = {
    from: process.env.EMAIL,
    to: process.env.EMAIL,
    subject: 'Otima Web (Interest Request)',
    html:`<p>Client Name: <strong>${data.firstName} ${data.lastName}</strong> </p>
    <p>Company: ${data.company}</p>
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

app.post("/api/text", async (req, res) => {
  const data = req.body.data; // This will contain the JSON data sent in the request

  let selected;
  if(data.selected.length===1){
    selected = parseInt(data.selected, 10);
  }
  else{
    selected = data.selected;
  }

  let options=[]
  let question='';
  let price = data.price;
  let domain = false;
  let complete = false;
  let maitnance = data.maitnance;
  let multiSelect = false;

  switch(data.question){
    case 1:
      options = ['< 1 Month', '1-3 Months', '1-3+ Months']
      question = 'Time Window for production build'
      
      if(selected === 0){
        price += 420;
      }
      else if(selected === 1){
        price += 1100;
      }
      else if(selected === 2){
        price += 600;
      }
      else if(selected === 3){
        price += 650;
      }
      break;

    case 2:
      options = ['Payments', 'Mobile Implementation', 'Automated Emails', 'OpenAI', 'Image Upload', 'User Handling', 'None']
      question = 'Which features are you looking to implement'
      multiSelect = true;

      if(selected === 0){
        price *= 1.2;
      }
      else if(selected === 1){
        price *= 1.1;
      }
      break;

    case 3:
      options = ['Yes', 'No']
      question = 'Do you have your own Domain aquired'
      
      for(let option in selected){
        option -= '0';

        if(option === 0){
          price += 100;
        }
        else if(option === 1){
          price += 40;
        }
        else if(option === 2){
          price += 65;
        }
        else if(option === 3){
          price += 70;
          maitnance += 100;
        }
        else if(option === 4){
          price += 100;
          maitnance += 20;
        }
      }

      break;

    case 4:
      if(selected === 1){
        maitnance += 30;
        price += 20;
      }
      complete = true;
      break;
  }

  return res.json({
    'success':true,
    'complete': complete,
    'question': question,
    'options': options,
    'price': Math.trunc(price),
    'maitnance': maitnance,
    'domain': domain,
    'multiSelect':multiSelect,
  }) 

});

app.post("/api/login", async (req, res) => {
  console.log(req.body.data)

  try{
    const data = req.body.data

    // const response = await oAuth2Client.getToken(code)
    // return res.json({response}) 

  }
  catch (error){
    console.log(error)
  }

  return res.json({'success':true}) 

});

app.post("/api/appointment", async (req, res) => {

  try{

  }
  catch (error){
    console.log(error)
  }

  return res.json({'success':true}) 

});




app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

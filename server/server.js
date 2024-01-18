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


app.post("/api/interest", async (req, res) => {
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
selected
      if(selected === 0){
        price += 350;
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
      console.log(selected);
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
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

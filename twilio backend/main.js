const express = require('express')
const twilio = require('twilio')
require('dotenv').config()
const app = express()
const cors = require('cors');


const PORT = process.env.PORT
app.use(cors())
app.use(express.json())


function sendSMS(phone){
    const client = new twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN)
    
    return client.messages.create({
        body: '\n\nALERT!!!\n Dear Sir/Mam,\nWe have detected ANOMALY in your latest transaction!!',
        from: process.env.PHONE_NUMBER,
        to: phone,
    })
    .then(message => {
        console.log(message, "message sent")
    })
    .catch(e => console.log(e))
}

app.post('/sendsms', (req, res) => {
    phone = req.body.phone
    console.log(phone)
    try{
        sendSMS(phone);
        console.log(phone)
        res.status(200).json({success: true})
    }
    catch(e){
        console.log(e)
        res.status(500).send({success: false})
    }
})

app.post('/predict', (req, res) => {
    try{
        console.log('hello')
        res.status(200).json({success: true})
    }
    catch(e){
        console.log(e)
        res.status(500).send({success: false})
    }
})

app.post('/transact', (req, res) => {
    // id = req.body.params.id
    try{
        console.log('h')
        res.status(200).json({success: true})
    }
    catch(e){
        console.log(e)
        res.status(500).json({success: false})
    }
})

app.listen(PORT, () => console.log(`server listening on port ${PORT}`))
const mockAPIResponse = require('./mockAPI.js')
const bodyParser = require('body-parser');
const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const app = express()

dotenv.config();
console.log(`Your API key is ${process.env.API_KEY}`)

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors())

app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
})

app.get('/test', function (req, res) {
    res.send(mockAPIResponse)
})

// designates what port the app will listen to for incoming requests
app.listen(8081, function () {
    console.log('Node app listening on port 8081!')
})

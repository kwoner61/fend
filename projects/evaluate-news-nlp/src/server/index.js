const mockAPIResponse = require('./mockAPI.js')
const bodyParser = require('body-parser')
const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const app = express()

const https = require('follow-redirects').https

dotenv.config();
const apiKey = process.env.API_KEY
console.log('Your API key is ', apiKey)

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors())

app.use(express.static('dist'))
app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
})

app.get('/test', function (req, res) {
    res.send(mockAPIResponse)
})

app.post('/sentiment-analysis', function (req, res) {
    let sentimentData = {}
    let options = {
        'method': 'POST',
        'hostname': 'api.meaningcloud.com',
        'path': encodeURI(`/sentiment-2.1?key=${apiKey}&lang=en&txt=${req.body.text}`),
        'maxRedirects': 20
    }
    let sentimentApiReq = https.request(options, function (sentimentApiRes) {
        sentimentApiRes.on('data', function (data) {
            sentimentData = data.toString()
        })
        sentimentApiRes.on("end", function () {
            res.status(200).send(sentimentData)
        });
        sentimentApiRes.on("error", function (error) {
            console.error('on error ::: ', error)
        })
    })
    sentimentApiReq.end()
})

// designates what port the app will listen to for incoming requests
app.listen(8081, function () {
    console.log('Node app listening on port 8081!')
})

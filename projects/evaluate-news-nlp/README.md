# Evaluate Sentiment of Text
This is my code implementation for Project 4 of FEND at Udacity.
The application will send a message (user input text) to the Sentiment Analysis API (MeaningfulCloud)
and will receive in return a Sentiment score of the message.

The Sentiment score is translated into a readable message.
For example, Sentiment code of P+ is translated to "Very Positive"
- P+: "Very Positive"
- P: "Positive"
- NEU: "Neutral"
- N: "Negative"
- N+: "Very Negative"
- NONE: "Not Sentimental at all"
- ERROR: "Not Sent" // if server (Node) is unreachable

## How to setup the dev environment
### Clone or download the repo and install Node packages
- `npm install`<br>
### Generate a `dist` folder for prod
- `npm run build-prod`<br>
### Run the Express server on port 8081
- `npm start`
### Run the dev server on port 8080
- `npm run build-dev`

[![Netlify Status](https://api.netlify.com/api/v1/badges/bacf1986-11d5-4851-98bb-3e150641716e/deploy-status)](https://app.netlify.com/sites/fend-sentiment-analysis/deploys)

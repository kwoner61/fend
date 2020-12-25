function handleSubmit(event) {
    event.preventDefault()

    // check what text was put into the form field
    let formText = document.getElementById('name').value
    Client.checkForName(formText)

    validateInputText(formText) ? 
        sendSentimentRequest(formText) : alert('That\'s an invalid message.')
}

function sendSentimentRequest(formText) {
    fetch('http://localhost:8081/sentiment-analysis', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            'text': formText
        })
    })
    .then(res => res.json())
    .then(res => {
        document.getElementById('results_prefix').style.visibility = 'visible'
        document.getElementById('results').innerHTML = getSentimentLabel(res.score_tag)
        document.getElementById('name').value = ''
    })
}

function getSentimentLabel(code) {
    switch (code) {
        case 'P+':
            return 'Very Positive'
        case 'P':
            return 'Positive'
        case 'NEU':
            return 'Neutral'
        case 'N':
            return 'Negative'
        case 'N+':
            return 'Very Negative'
        case 'NONE':
            return 'Not Sentimental at all'
    }
}

function validateInputText(inputText) {
    return inputText.length > 0
}

export { handleSubmit }

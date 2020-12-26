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
    .catch((error) => {
        console.log('Error during fetch to /sentiment-analysis! ', error)
        alert('Oh no! The server is not reachable.')
        return {
            score_tag: 'ERROR',
            place_holder: document.getElementById('name').value
        }
    })
    .then(res => {
        document.getElementById('results_prefix').style.visibility = 'visible'
        document.getElementById('results').innerHTML = getSentimentLabel(res.score_tag)
        document.getElementById('name').value = res.place_holder ? res.place_holder : '' // value will be '' if no error
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
        case 'ERROR':
            return 'Not Sent'
    }
}

function validateInputText(inputText) {
    return inputText.length > 0
}

export { handleSubmit }

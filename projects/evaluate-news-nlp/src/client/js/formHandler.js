function handleSubmit(event) {
    event.preventDefault()

    // check what text was put into the form field
    let formText = document.getElementById('name').value
    Client.checkForName(formText)

    //console.log("::: Form Submitted :::")
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
        document.getElementById('results').innerHTML = res.score_tag
    })    
}

export { handleSubmit }

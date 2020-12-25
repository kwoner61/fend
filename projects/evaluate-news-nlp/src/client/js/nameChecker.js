function checkForName(inputText) {
    console.log("::: Running checkForName :::", inputText);
    let names = [
        "Picard",
        "Janeway",
        "Kirk",
        "Archer",
        "Georgiou"
    ]

    names.forEach(function (item) {
        if (inputText.includes(item)) {
            alert("Welcome, Captain!")
        }
    })
}

export { checkForName }

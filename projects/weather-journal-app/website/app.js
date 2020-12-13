/* Global Variables */
const apiKey = '9d3a2f33d5f20c9fe325af888b8b4fa0';
const weatherApiBaseUrl = 'https://api.openweathermap.org/data/2.5/weather?units=imperial&zip=';

// Retrieve current weather data by zipcode
const getWeatherData = async (url = '', zipCode = 06511) => {
  const response = await fetch(url + zipCode + ',us&appid=' + apiKey);
  try {
    const weatherData = await response.json();
    console.log('Retrieved weather data for zip: ', zipCode);
    return weatherData;
  } catch (error) {
    console.log('error', error);
  }
}

// Event handler for clicking the Generate button
function onGenerate(e) {
  e.preventDefault();
  let zipCode = document.getElementById('zip').value;
  getWeatherData(weatherApiBaseUrl, zipCode).then(function(weatherData) {
    let newEntryData = createNewEntry(weatherData);
    saveWeatherData('/journal-entries', newEntryData).then(function(response) {
      console.log('Saved new entry: ', newEntryData);
    }).then(
      updateView()
    );
  });
}
document.getElementById('generate').addEventListener('click', onGenerate);

// Create new journal entry
function createNewEntry(weatherData) {
  const userResponse = document.getElementById('feelings').value;
  let newEntry = {
    temperature: Math.round(weatherData.main.temp),
    date: getDate(),
    userResponse: userResponse
  }
  return newEntry;
}

// Save weather data and journal entry
const saveWeatherData = async (url = '', data = {})=>{
  const response = await fetch(url, {
    method: 'POST',
    credentials: 'same-origin',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  try {
    return response;
  } catch (error) {
    console.log('error', error);
  }
}

// Update the view
const updateView = async () => {
  const response = await fetch('/journal-entries');
  try {
    const projectData = await response.json();
    document.getElementById('date').innerHTML = projectData.date;
    document.getElementById('temp').innerHTML = projectData.temperature + ' F';
    document.getElementById('content').innerHTML = '"' + projectData.userResponse + '"';
  } catch (error) {
    console.log('error', error);
  }
}

// Get the current date
function getDate() {
  let d = new Date();
  const monthName = month[d.getMonth()];
  const dayNumber = d.getDate() + 1;
  const year = d.getFullYear();
  return monthName + ' ' + dayNumber + ', ' + year;
}

const month = {
  0: 'January',
  1: 'February',
  2: 'March',
  3: 'April',
  4: 'May',
  5: 'June',
  6: 'July',
  7: 'August',
  8: 'September',
  9: 'October',
  10:'November',
  11:'December'
}

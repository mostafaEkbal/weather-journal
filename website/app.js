

/* Global Variables */
const apiKey = 'e3cd0efbe94996baa6851bcae2015370';

//AN ASYNC FUNCTION TO SEND A POST REQUEST TO THE SERVER
const postData = async (url = '', data = {}) => {
    const response = await fetch(url, {
        method: 'POST', 
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
       // Body data type must match "Content-Type" header        
        body: JSON.stringify(data), 
      });
    
    try {
        const newData = await response.json();
        console.log(newData);
        return newData;
    }
    
    catch(error) {
        console.log('error', error);
    }
}

//AN ASYNC FUNCTION TO UPDATE THE UI
const updateUI = async (data) => {
    
    try { 
        console.log(data)
        document.getElementById('date').innerHTML = `${data.name}, US`;
        document.getElementById('description').innerHTML = `Feels like ${Math.round(data.feelsLike)}°F. ${data.mainDescription}. ${data.description}`
        document.getElementById('temp').innerHTML = `The weather is ${Math.round(data.temperature)}°F`;
        document.getElementById('content').innerHTML = data.feelings;
    }
    catch(error) {
        console.log('error', error);
    }
}

//AN ASYNC FUNTION TO FETCH THE API
const fetchApi = async(input, feel) => {
    const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?zip=${input},us&appid=${apiKey}&units=imperial`);
    
    try {
        const allData = await res.json();
        console.log(allData)
        //SENDING THE DATA TO THE SERVER
        postData('/api', {
        temperature:allData.main.temp, 
        name:allData.name, 
        feelsLike:allData.main.feels_like,
        mainDescription:allData.weather[0].main,
        description:allData.weather[0].description,
        feelings:feel
    });
    }
    
    catch(error) {
        console.log('error', error);
    }
}

//CREATING AN EVENT LISTENER
document.querySelector('#generate').addEventListener('click', ()=> {
    const zip = document.getElementById('zip').value;
    const feeling = document.getElementById('feelings').value;
    
    //CHAINING PROMISES
    fetchApi(zip, feeling)
    .then(async() =>{
        const res = await fetch('/all')
        const alldata = await res.json()
        updateUI(alldata)
    })
    
})



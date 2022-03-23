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
        document.getElementById('date').textContent = 'The timezone is GMT'+(data[data.length - 1].date)+':00';
        document.getElementById('temp').textContent = 'The weather is '+ (Math.round(data[data.length - 1].temperature) + ' degrees');
        document.getElementById('content').textContent = data[data.length - 1].feelings;
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
        //SENDING THE DATA TO THE SERVER
        postData('/api', {temperature:allData.main.temp, date:allData.timezone / 3600, feelings:feel});
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



/* Global Variables */

let apiKey = 'e3cd0efbe94996baa6851bcae2015370';

const postData = async (url = '', data = {}) => {
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };
    const response = await fetch('/api', options);
    
    try {
        const newData = await response.json();
        console.log(newData);
        return newData;
    }

    catch(error) {
        console.log('error', error);
    }
}

const uptadeUI = async (input, feel) => {
    const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?zip=${input},us&appid=${apiKey}&units=imperial`);

    try {
        const allData = await res.json();
        console.log(allData);
        document.getElementById('temp').textContent = Math.round(allData.main.temp)+ ' degrees';
        document.getElementById('content').textContent = feel;
        document.getElementById("date").textContent ='GMT'+(allData.timezone/3600)+':00';
        return allData;
    }
    catch(error) {
        console.log('error',error);
    }
}

document.querySelector('#generate').addEventListener('click', ()=> {
    const zip = document.getElementById('zip').value;
    const feelings = document.getElementById('feelings').value;
    
    uptadeUI(zip, feelings)
    .then(postData('/api', {feeling:feelings, code:zip}));
})
// Setup empty JS object to act as endpoint for all routes
let projectData = {
    
};



// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Dependencies */
const bodyParser = require('body-parser');

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const port = 3000;

app.listen(port, listening);

function listening() {
    console.log("the server is running");
    console.log(`running on local host ${port}`);
}


app.get('/all', (req, res) => {
    res.send(projectData)
})

app.post('/api', (req, res) => {
    console.log('i got a request!');
    newEntry = {
        temperature: req.body.temperature,
        name: req.body.name,
        feelsLike: req.body.feelsLike,
        mainDescription: req.body.mainDescription,
        description: req.body.description,
        feelings: req.body.feelings
      }
    
    projectData = newEntry
    console.log(projectData)
});


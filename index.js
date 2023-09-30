// import the pets array from data.js
const pets = require('./data');

// init express app
const express = require('express');
const app = express();
const PORT = 8080;

// GET - / - returns homepage
// So, in order to return a basic homeback I'm gonna use res to send back an HTTP response to display in the browser!
app.get('/', (req, res) => {
    res.send("Hello, and welcome to pet finder!")
;
})

// hello world route
app.get('/api', (req, res) => {
    res.send('Hello World!');
});

// So, in order to do this I just have to do a simple res to send back an HTTP response that contains the variable "pets", which was helpfully declared for me above.
app.get('/api/pets', (req, res) => {
    console.log(pets);
    res.send(pets)
});

// okay, next I have to get a specific pet by name.  Simple!  The url will utilize the colon (:) after the final slash which will tell the computer to use that name as a parameter.  Then I'll create a second variable (destructing the name) to locate the specific petname from the database.  I'll use a find function and a strict equality operator!

app.get("/api/pets/:name", (req, res) => {
    const {name} = req.params;
    const petName = pets.find((petName) => petName.name === name)
    res.send(petName);
});

// now I'm doing the same thing I did with the pet's NAMES, but now with their OWNERS.  And I'll use a query selector as opposed to a params selector, cause the instructions ask for it.  Not much difference in the actual code here, but when navigating to the url in the browser you need to use a ?=before the variable.  
app.get("/api/pets/owner/:owner", (req, res) => {
    const {owner} = req.query;
    const petOwner = pets.find((petOwner) => petOwner.owner === owner)
    res.send(petOwner)
});

// This is to make the index file accessible via the output port
app.get('/api/index', (req, res) => {
    res.sendFile( __dirname + "/public/index.html");
});


// This is necessary so we can open the port and see the output in the browser.
app.listen(PORT, () => {
    console.log('Server is listening on port ' + PORT);
});

module.exports = app;
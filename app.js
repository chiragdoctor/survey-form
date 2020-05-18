const fs = require('fs');
const express = require('express');
const app = express();
const sanatize = require('./lib/sanatize.js');

const port = process.env.PORT || 5555;

app.use(express.static('views'));

app.use(express.urlencoded({ extended: false }))

app.use(express.json())

app.post('/', (req, res) => {
    const {name, email, phone, role, recommend, prefer, comment} = req.body;
    const pref = prefer.join();
    const message = `My name is: ${name} Email is: ${email} Phone: ${phone} Role: ${role} Recommend: ${recommend} My Preference: ${pref} My Comment is: ${comment} \n`;

    res.redirect(`https://wa.me/${phone}?text=${message}`);
});

app.post('/save', (req, res) => {
    const {name, email, phone, role, recommend, prefer, comment} = req.body;
    const pref = prefer.join();
    const message = `Name: ${name};Email: ${email};Phone: ${phone};Role: ${role};Recommend: ${recommend};Preference: ${pref};Comments: ${comment} \n`;

    fs.appendFile('feedback.txt', message, (err) => {
        if(err) {
            res.send(err.message);
        } else {
            res.send('<h1> Data has been saved</h1>');
        }
    });
});

app.get('/feedback', (req, res) => {
    fs.readFile('feedback.txt', (err, data) => {
        if(err) {
            res.send(err.message);
        } else {
            const feedbacks = sanatize(data);
            res.send(`<h1>List of Entries</h1> <hr /> \n ${feedbacks}`);
        }
    })
});

app.get('/search/:phone', (req, res) => {
    fs.readFile('feedback.txt', (err, data) => {
        if(err) {
            res.send(err.message);
        } else {
            const phone = req.params.phone;
            const info = sanatize(data, phone);
            res.send(`<h1>User</h1> <hr /> \n ${info}`);
        }
    })
});

app.get('/search/:fname', (req, res) => {
    fs.readFile('feedback.txt', (err, data) => {
        if(err) {
            res.send(err.message);
        } else {
            const fname = req.params.fname;
            const info = sanatize(data, fname);
            
            res.send(`<h1>User</h1> <hr /> \n ${info}`);
        }
    })
});

app.listen(port, () => {
    console.log(`Server started at ${port}`)
});

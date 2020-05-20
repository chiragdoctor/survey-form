const fs = require('fs');
const express = require('express');
const app = express();
const sanatize = require('./lib/sanatize.js');
const emailer = require('./lib/emailer');

const port = process.env.PORT || 5555;

app.use(express.static('views'));

app.use(express.urlencoded({ extended: false }))

app.use(express.json())

app.post('/', (req, res) => {
    const { name, email, phone, role, recommend, prefer, comment } = req.body;
    const pref = prefer.join();
    const message = `My name is: ${name} Email is: ${email} Phone: ${phone} Role: ${role} Recommend: ${recommend} My Preference: ${pref} My Comment is: ${comment} \n`;

    res.redirect(`https://wa.me/${phone}?text=${message}`);
});

app.post('/save', (req, res) => {
    const { name, email, phone, role, recommend, prefer, comment } = req.body;
    const pref = prefer.join();
    const message = `Name: ${name};Email: ${email};Phone: ${phone};Role: ${role};Recommend: ${recommend};Preference: ${pref};Comments: ${comment} \n`;

    fs.appendFile('feedback.txt', message, (err) => {
        if (err) {
            res.send(err.message);
        } else {
            emailer.sendEmail(name, email);
            
            // emailer.sendEmailUsingGmail(name, email)
            // .then(() => {
            //     res.send('<h1>Thank You</h1><p>An email has been sent to you.</p>');
            // })
            res.send('<h1>Thank You</h1><p>An email has been sent to you.</p>');
        }
    });
});

app.get('/feedback', (req, res) => {
    fs.readFile('feedback.txt', (err, data) => {
        if (err) {
            res.send(err.message);
        } else {
            const feedbacks = sanatize(data);
            res.send(`<h1>List of Entries</h1> <hr /> \n ${feedbacks}`);
        }
    })
});

app.get('/search/:phone(\\d*)', (req, res) => {
    fs.readFile('feedback.txt', (err, data) => {
        if (err) {
            res.send(err.message);
        } else {
            const phone = req.params.phone;
            const info = sanatize(data, phone);
            res.send(`<h1>Searched User by phone</h1> <hr /> \n ${info}`);
        }
    })
});

app.get('/search/:fname([A-Za-z]*)', (req, res) => {
    fs.readFile('feedback.txt', (err, data) => {
        if (err) {
            res.send(err.message);
        } else {
            const fname = req.params.fname;
            const info = sanatize(data, fname);

            res.send(`<h1>Searched User by first name</h1> <hr /> \n ${info}`);
        }
    })
});

app.listen(port, () => {
    console.log(`Server started at ${port}`)
});

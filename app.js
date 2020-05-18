const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const port = process.env.PORT || 5555;

app.use(express.static('views'));

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())

app.post('/', (req, res) => {
    console.log(req.body);
    const {name, email, phone, role, recommend, prefer, comment} = req.body;
    const pref = prefer.join();
    const message = `My name is: ${name} 
                     Email is:  ${email} 
                     Role: ${role} 
                     Recommend: ${recommend}
                     My Preference: ${pref} 
                     My Comment is: ${comment}`;

    
    res.redirect(`https://wa.me/${phone}?text=${message}`);
});

app.listen(port, () => {
    console.log(`Server started at ${port}`)
});

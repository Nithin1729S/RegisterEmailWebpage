import express from "express";
var app = express();
import mysql from 'mysql2';
import path from 'path'
const __dirname = path.resolve();
import bodyParser from "body-parser";  //allows to extract info from post request
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname+ '/public'))

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'hcvnit730',
    database: 'join_us'
});


app.get('/', function (req, res) {
    //console.log("Someone requested us");
    //res.send("You've reached the home page")
    var q = 'SELECT count(*) as total from users'
    db.query(q, function (error, results, field) {
        if (error) throw error;
        var count = results[0].total;
        //res.send("We have " + count + " users in our db");
        res.render('home', { data: count });  //goes to views folder and searches for a file name home.ejs
    });
})


//db.end();


// app.get('/joke', function (req, res) {
//     res.send("Knock Knock")
// })

// app.get('/randnum', function (req, res) {
//     var x = (Math.floor(Math.random() * 10) + 1)
//     res.send("Your lucky number is  " + x);
// })

app.post('/register', function (req, res) {
    var email = req.body.email;

    // Check if email is empty
    if (!email) {
        return res.status(400).send("<script>alert('Email cannot be empty'); window.history.back();</script>");
    }

    var person = {
        email: req.body.email
    };
    db.query('Insert into users set ?', person, function (err, results) {
        if (err) {
            // Check for duplicate entry error
            if (err.code === 'ER_DUP_ENTRY') {
                return res.status(400).send("<script>alert('Email already exists'); window.history.back();</script>");
            }
            // For other errors
            return res.status(500).send("<script>alert('Internal Server Error'); window.history.back();</script>");
        }
        res.send("<script>alert('Registration successful'); window.location='/';</script>");
    });

})


app.listen(8080, function () {
    console.log("Server running on 8080!");
});


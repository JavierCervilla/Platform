const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const dotenv = require('dotenv');
const db = require('./config/db');
const morgan = require('morgan');

// load config paTH

dotenv.config({path: './config/config.env'});

//conect database
db();

const app = express();

// body parser
app.use(express.urlencoded({ extended : false }));
app.use(express.json());

// routes
app.use("/", require('./routes/web'));
app.use("/api", require('./routes/api'));

//define the port
const PORT = process.env.PORT || 3000;


//setup morgAN
if (process.env.NODE_ENV === 'development')
{
    app.use(morgan("dev"));
}

app.engine(".hbs", exphbs({
    defaultlayout: "main",
    extname : ".hbs"
}));

app.set("view engine", ".hbs");

// Carperta publica
app.use(express.static(path.join(__dirname, "public")));

// init app
app.listen(PORT,() => 
console.log(`Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
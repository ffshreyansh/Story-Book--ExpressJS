const path = require("path")
const express = require("express");
// const mongoose = require("mongoose")
const dotenv = require("dotenv");
const morgan = require("morgan");
const exphbs = require("express-handlebars");
const passport = require("passport")
const session = require("express-session")
const connectDB = require("./config/db");




// mongoose.connect(process.env.MONGO_URL);

//Load Config
dotenv.config({path: "./config/config.env"})

//Passport
require("./config/passport")



connectDB()

const app = express();


//Logging
if(process.env.NODE_ENV === "development"){
    app.use(morgan("dev"))
}

//Static
app.use(express.static(path.join(__dirname, "public")))

//HandleBars
app.engine('.hbs', exphbs.engine({defaultLayout: 'main', extname: '.hbs'}))
app.set('view engine', ".hbs")

//Sessions
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
  }))

//Passport Middleware
app.use(passport.initialize())
app.use(passport.session())


//Routes
app.use("/", require("./routes/index"))






const PORT = process.env.PORT || 3000

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}` ))

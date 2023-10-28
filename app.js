const express = require('express');
const http = require('http');
const dotEnv = require('dotenv');
const cors = require('cors');
const exphbs = require('express-handlebars');
const path = require('path');
const routes = require('./src/routes/index');
const dbConnection = require('./src/config/database.js');
const methodOverride = require('method-override');
const morgan = require('morgan');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');

// Initializations
dotEnv.config();
const app = express(); 
dbConnection();
require('./src/config/passport.config');

// Settings
app.set('port', process.env.PORT || 4000); // set a port variable
app.set('views', path.join(__dirname, 'src/views')); // set where the views folder is
app.engine('.hbs', exphbs.engine({
  layoutsDir: path.join(app.get('views'),'layouts'),
  partialsDir: path.join(app.get('views'),'partials'),
  extname: '.hbs'
}));

// template engine configuration
app.set('view engine', '.hbs');

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
app.use(cors());
app.use(morgan('tiny'));
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true,
}));

// Global variables
app.use(passport.initialize());
app.use(passport.session());
app.use(flash()); 

app.use((req,res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');  
  res.locals.error = req.flash('error');  
  res.locals.user = req.user;
  next();
});


// Routes
app.use('/api',routes);



// Static files
app.use(express.static(path.join(__dirname, 'src/public')));

app.listen(app.get('port'), () => {
  console.log(`Server on port: ${app.get('port')}`);
});


module.exports = app;
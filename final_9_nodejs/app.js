const express = require('express')
const app = express()
const hbs = require('express-handlebars').engine;
const session = require('express-session');
const flash = require('express-flash');
const passport = require('passport');
const cors = require('cors');
// config passport
const initializeGooglePassport = require('./config/oauth2');
const initializePassport = require('./config/passport-config');
// config gg passport

require('dotenv').config({path: './config/.env'});

// Connect to Database
const db = require('./config/db');
db.connect();
const port = process.env.PORT;
const customHelpers = require('./util/customHelpers');
app.use(cors());

app.use(session({
    secret: 'mysecretkey',
    resave: false,        
    saveUninitialized: false,
    cookie: {
        secure: false,
    }
}));
app.use(express.json());
app.use(flash());
app.use(passport.initialize()) 
app.use(passport.session())

// init Google passport
initializeGooglePassport(passport);


// // innitalizepassport config
initializePassport(passport);

app.engine('hbs', hbs({
    defaultLayout: 'main',
    extname: '.hbs',
    helpers: {
        ...customHelpers.helpers,
        // Helper so sánh bằng (==)
        eq: function (a, b) {
            return a == b;
        },
        for: function(from, to, incr, block) {
            let accum = '';
            for(let i = from; i <= to; i += incr){
              accum += block.fn({index: i});
            }
            return accum;
          },
        section: function(name, options) {
            if (!this._sections) this._sections = {};
            this._sections[name] = options.fn(this);
            return null;
        },
        incremented: function(index) {
            index++;
            return index;
        },
        format_datetime: function(date) {
            date = new Date(date)
            let year = date.getFullYear();
            let month = date.getMonth() + 1;
            let day = date.getDate();
            let hours = date.getHours();
            let minutes = date.getMinutes();
            let seconds = date.getSeconds();
          
            month = month < 10 ? '0' + month : month;
            day = day < 10 ? '0' + day : day;
            hours = hours < 10 ? '0' + hours : hours;
            minutes = minutes < 10 ? '0' + minutes : minutes;
            seconds = seconds < 10 ? '0' + seconds : seconds;
          
            return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
        },
        format_date: function(date) {
            date = new Date(date)
            let year = date.getFullYear();
            let month = date.getMonth() + 1;
            let day = date.getDate();
          
            month = month < 10 ? '0' + month : month;
            day = day < 10 ? '0' + day : day;
          
            return `${day}-${month}-${year}`;
        },
        format_currency: function (amount) {
            if (amount == null || amount === "") return "0 ₫";
            return Number(amount).toLocaleString("vi-VN", {
                style: "currency",
                currency: "VND"
            });
        },

        convertMap: function (map) {
            let object = {};
            map.forEach((value, key) => {
                object[key] = value;
            });
            return object;
        },
        ifCond: function (v1, operator, v2, options) {

            switch (operator) {
                case '==':
                    return (v1 == v2) ? options.fn(this) : options.inverse(this);
                case '===':
                    return (v1 === v2) ? options.fn(this) : options.inverse(this);
                case '!=':
                    return (v1 != v2) ? options.fn(this) : options.inverse(this);
                case '!==':
                    return (v1 !== v2) ? options.fn(this) : options.inverse(this);
                case '<':
                    return (v1 < v2) ? options.fn(this) : options.inverse(this);
                case '<=':
                    return (v1 <= v2) ? options.fn(this) : options.inverse(this);
                case '>':
                    return (v1 > v2) ? options.fn(this) : options.inverse(this);
                case '>=':
                    return (v1 >= v2) ? options.fn(this) : options.inverse(this);
                case '&&':
                    return (v1 && v2) ? options.fn(this) : options.inverse(this);
                case '||':
                    return (v1 || v2) ? options.fn(this) : options.inverse(this);
                default:
                    return options.inverse(this);
            }
        }
    }
}))
app.set('view engine', 'hbs')
app.set('views', './views');
app.use(express.static(__dirname + '/public'));
app.use('/select-flight', express.static(__dirname + '/public'));
app.use(
    express.urlencoded({
        extended: true,
    }),
);

// init Route middle
const initRoute = require('./routes');
initRoute(app);

const ratingRouter = require('./routes/rating');
app.use('/rating', ratingRouter);

const clientRouter = require('./routes/search');
app.use('/search', clientRouter);



app.listen(port, ()=> console.log(`Server listening on port: ${port}`));

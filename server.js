const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const routes = require('./controllers');
const helpers = require('./config/helpers');
const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();
const PORT = process.env.PORT || 3001;

// Set up Handlebars.js engine with custom helpers
const handlebars = exphbs.create({ helpers });

const sess = {
    secret: process.env.SECRET,
    cookies: {
        // Stored in milliseconds (86400 = 1 day)
        maxAge: 1000 * 60 * 60 * 24,
        httpOnly: true,
        secure: false, //true if using https
        sameSite: 'strict',
    },
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize,
    }),
};

app.use(session(sess));

// Tells express what template engine to use
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

// Starts the server, syncs the database, and console logs which port it's listening on.
const server = async () => {
    try {
        await sequelize.sync({ force: false });
        app.listen(PORT, () => console.log(`Now listening at port ${PORT}`));
    } 
    catch (error) {
        console.error(error, 'Failed to begin listening.')
    }
};

server();
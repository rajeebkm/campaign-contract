const { createServer } = require('http');
const next = require('next');

//create new app instance with the next helper by passing configuration object to it (whether we are running our server in production or development mode)
const app = next({
    dev: process.env.NODE_ENV !== 'production'
});

const routes = require('./routes');

//get handler by passing app object to getRequestHandler in the routes
const handler = routes.getRequestHandler(app);

//set up the app and tell it to listen to specific port
app.prepare().then(() => {
    createServer(handler).listen(3000, (error) => {
        if (error) throw error;
        console.log('Ready on localhost:3000');
    });
});



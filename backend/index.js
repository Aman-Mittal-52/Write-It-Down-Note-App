// Packages
require('dotenv').config();
const express = require('express');
const cors = require('cors');

// Server
const app = express();

// Database connection
const conneection = require('./Config/db.config');
const userRouter = require('./Routes/user.route');
const noteApp = require('./Routes/note.route');
const authenticate = require('./Middlewares/authenticate.middleware');

// Environment Variables
const PORT = process.env.PORT;

// Middleware
app.use(express.json());
app.use(cors({
    origin: '*'
}));
app.use('/user', userRouter)
app.use('/notes', authenticate,noteApp)

// health check
app.get('/', function (req, res) {
    res.send('Server is running');

});


// Start server
app.listen(PORT, async () => {
    try {
        await conneection
        console.log(`Server running on port ${PORT}`);
    } catch (error) {
        console.log(`Error running on port ${PORT}`)
        console.log(`${error}`)
    }
});

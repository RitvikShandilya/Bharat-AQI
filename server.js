const express = require('express');
const dotENV = require('dotenv');
const cors = require('cors');
const dbConnection = require('./database/connection');

dotENV.config();

const app = express();

//db connectivity
dbConnection();

//cors
app.use(cors());

//request payload middleware
app.use(express.urlencoded({extended: true}));
app.use(express.json());

// app.use('/api/v1/product', require('./routes/productRoutes'));

app.use('/api/v1/station', require('./routes/stationRoutes'));
app.use('/api/v1/aqidata', require('./routes/aqiDataRoutes'));

const myMiddleware = (req, res, next) => {
    console.log('hey wassup');
    next();
}

// app.use(myMiddleware);

app.get('/', myMiddleware, (req, res, next) => {
    res.send('Hello from node api server');
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server listening on port${PORT}`);
});

// error handler middleware
app.use(function (err, req, res, next) {
    console.error(err.stack)
    res.status(500).send({
        status: 500,
        message: err.message,
        body: {}
    });
})
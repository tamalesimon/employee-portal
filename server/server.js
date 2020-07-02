const express = require('express');
const { request, response } = require('express');
const app = express();
const cors = require('cors');

const apiRouter = require('./routing/apiRouter');

const mongoose = require('mongoose');

const hostname = '127.0.0.1';
const port = 5000;

app.use(cors());



//configure json parser for form data handling
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (request, response) => {
    response.send(`<h2>Welcome to express js</h2>`);
});

//configure routing 
app.use('/api', apiRouter);

// connect to mongodb database

mongoose.connect('mongodb://127.0.0.1:27017/employee-portal', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}).then((connection) => {
    console.log('connected to mongo db database success...');
}).catch((err) => {
    console.log(err);
    process.exit(1); //to stop the node js process
})


app.listen(port, hostname, () => {
    console.log(`server is running at http://${hostname}:${port}`);
});
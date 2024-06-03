const express = require("express");
const port = 3000;
const noteRoute = require("./routes/noteRoute")
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

const v1Router = express.Router();

app.get('/', (req, res) => {
    res.status(200).send({
        code: '200',
        status: 'ok',
        message: 'Welcome to Well Predict API'
    })
})

v1Router.use(noteRoute);
app.use(v1Router);

app.use((req, res, next) => {
    res.status(404).send({
        code: '404',
        status: 'Not Found',
        errors: {
            message: 'The page or resource you\'re looking for could not be found.'
        }
    })
})

app.listen(port, () =>{
    console.log(`Server listening at http://localhost:${port}`)
})
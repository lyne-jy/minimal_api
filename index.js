const express = require('express')
const path = require("path");
const cors = require("cors")
const log = require('simple-node-logger').createSimpleFileLogger('project.log');

const app = express()
const port = 4000

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.post('/', (req, res) => {
    try {
        console.log(req.body)
        const {email, name, message} = req.body;
        if (!email || !name || !message)
            res.status(400).send("Bad request.")
        else {
            log.info('Email: ', email, ' Name: ', name, ' Message: ', message, new Date().toJSON());
            res.send('Message sent.')
        }
    }
    catch (e) {
        res.status(400).send("Bad request.")
    }

})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
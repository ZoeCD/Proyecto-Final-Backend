const express = require("express")
const mongoose = require("mongoose")
const auth = require('./routes/auth.js')
const destination = require('./routes/destination.js')
const app = express()

mongoose.connect(
    `mongodb://${process.env.DB_USER}:${process.env.DB_PW}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB}?authSource=admin`,
    { 
        useUnifiedTopology: true
    }
).catch((e) => {
    console.log("error connecting to mongoose!", e);
});
mongoose.connection.on("error", (err) => {
    const inspect = require('util').inspect
    console.log(inspect(err, { depth: Infinity, showHidden: true }));
});
mongoose.connection.on("connected", () => {
    console.log("connected to mongo");
});


app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.use(auth);
app.use(destination);

const listener = app.listen(process.env.PORT, () => { console.log('Listening @ ' + listener.address().port) })

const { application } = require("express")
const express = require("express")
const mongoose = require("mongoose")
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.listen(8080,()=>console.log("En línea puerto 8080"))

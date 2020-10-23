const express = require("express");

const router = express.Router();

const {environment} = require("./config/index.js")

router.get("/", (req, res) => {
    res.render("index", { title: "Home" })
})

    if (environment !== 'production') {
        router.get('/error-test', () => {
          throw new Error('This is a test error')
        })
      } 


module.exports = {router}
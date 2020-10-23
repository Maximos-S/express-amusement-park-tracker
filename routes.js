const express = require("express");
const db = require('./db/models')
const router = express.Router();


const { environment } = require("./config/index.js")

const asyncHandler = (handler) => (req, res, next) => handler(req, res, next).catch(next);

router.get("/", (req, res) => {
    res.render("index", { title: "Home" })
})

    if (environment !== 'production') {
        router.get('/error-test', () => {
          throw new Error('This is a test error')
        })
      } 

router.get('/parks', asyncHandler(async (req, res) => {
  const parks = await db.Park.findAll({
    order: ['parkName']
  })
  res.render('park-list', {parks})
}));
module.exports = {router}
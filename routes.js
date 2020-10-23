const express = require("express");
const db = require('./db/models')
const router = express.Router();
const csrf = require('csurf');
const csrfProtection = csrf({ cookie: true });
const {check, validationResult } = require('express-validator')


const parkValidators = [
  check('parkName')
    .exists({ checkFalsy: true})
    .withMessage("Please provide a value for Park Name")
    .isLength({ max: 255})
    .withMessage("Park Name must not be more than 255 characters long"),
  check('city')
    .exists({ checkFalsy: true})
    .withMessage("Please provide a value for City")
    .isLength({ max: 100})
    .withMessage("City must not be more than 100 characters long"),
  check('provinceState')
    .exists({ checkFalsy: true})
    .withMessage("Please provide a value for Province/State")
    .isLength({ max: 100})
    .withMessage("Province/State must not be more than 100 characters long"),
  check('country')
    .exists({ checkFalsy: true})
    .withMessage("Please provide a value for Country")
    .isLength({ max: 100})
    .withMessage("Country must not be more than 100 characters long"),
  check('opened')
    .isDate({ checkFalsy: true })
    .withMessage( "Please provide a valid date for Opened")
    .exists({ checkFalsy: true})
    .withMessage("Please provide a value for Opened"),
  check('size')
    .exists({ checkFalsy: true})
    .withMessage("Please provide a value for Size")
    .isLength({ max: 100})
    .withMessage("Size must not be more than 100 characters long"),
  check('description')
    .exists({ checkFalsy: true})
    .withMessage("Please provide a value for Description")
  ]


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

router.get("/park/:id(\\d+)", asyncHandler( async (req, res) => {
  const parkId = parseInt(req.params.id, 10);
  const park = await db.Park.findByPk(parkId);

  res.render("park-detail", { title: "Park Detail", park})
}))

router.get("/park/add", csrfProtection, (req, res) => {
  const park = db.Park.build();
  res.render("park-add", {title:"Add Park", park, csrfToken: req.csrfToken()})
})

router.post("/park/add", csrfProtection, parkValidators, asyncHandler(async (req, res) => {
  const { parkName, city, provinceState, country, opened, size, description} = req.body

  const park = dp.Park.build()

  park.parkName = parkName
  park.city = city
  park.provinceState = provinceState
  park.country = country
  park.opened = opened
  park.size = size
  park.description = description

  
  const validatorErrors = validationResult(req)
  
  if (validatorErrors.isEmpty()) {
    await park.save();
    res.redirect("/")

  } else {
    const errors = validatorErrors.array().map(error => error.msg)

    //this is where we stopped!!!
    res.render("/park/add")
  }

  

}))

router.get('/parks', asyncHandler(async (req, res) => {
  const parks = await db.Park.findAll({
    order: ['parkName']
  })
  res.render('park-list', {parks})
}));
module.exports = {router}
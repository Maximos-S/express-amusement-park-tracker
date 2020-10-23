const express = require('express');
const morgan = require('morgan');
const { router } = require('./routes')

const app = express();

app.set('view engine', 'pug');

app.use(morgan('dev'));
app.use(router);

app.use((req, res, next) => {
  const err = new Error('The requests page couldnn\'t be found');
  err.status = 404;
  next(err);
})

app.use((err, req, res, next) => {
  console.error(err)
  next(err)
})

app.use((err, req, res, next) => {
  if (err.status === 404) {
    res.status(404)
    res.render('page-not-found', {title: 'Page Not Found'})
  }
  next(err)
})

app.use((err, req, res, next) => {
  res.status(err.status || 500)
  res.render('error', { title: 'Server Error', err })
})


module.exports = app
const koaRouter = require('koa-router');
const router = new koaRouter();
const cros = require('koa2-cors');


const books = require('../db/curd/book');
// const user = require('./api/user');

router.get('/books', books.find);


module.exports = router;
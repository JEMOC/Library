const koaRouter = require('koa-router');
const router = new koaRouter();
const user = require('../db/curd/user');


router.post('/login', user.login);
router.post('/register', user.register);

module.exports = router;
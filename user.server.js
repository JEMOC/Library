const koa = require('koa');
const koaRouter = require('koa-router');
const bodyParser = require('koa-bodyparser');
const user_server = new koa();
const router = new koaRouter();
const cors = require('koa2-cors');
const userRouter = require('./routes/users');

user_server.use(bodyParser());

router.use('/user', userRouter.routes(), userRouter.allowedMethods());

user_server.use(cors());
user_server.use(router.routes(), router.allowedMethods());

user_server.listen(81, () => {
    console.log('user server is listening 81');
})

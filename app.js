const koa = require('koa');
const koaRouter = require('koa-router');
const fs = require('fs');
const static = require('koa-static');
const cors = require('koa2-cors');
const bodyParser = require('koa-bodyparser');

//server
const imgserver = require('./img.server')
const dataserver = require('./api-server-rx');
const userserver = require('./user.server');

//路由
const apiRouter = require('./routes/api');




const app = new koa();
const router = new koaRouter();

//中间件
app.use(cors());
app.use(bodyParser());
app.use(static('./src/library'));


router.use('/api', apiRouter.routes(), apiRouter.allowedMethods());

router.get('/', async (ctx) => {
    let homepage = fs.createReadStream('./src/library/index.html');
    ctx.response.type = 'html';
    ctx.body = homepage;
});



app.use(router.routes(), router.allowedMethods());
app.use(async (ctx, next) => {
    await next();
    if (ctx.response.status = 404) {
        ctx.response.status = 200;
        ctx.body = '404 not found';
    }
});

app.listen(80, (ctx) => {
    console.log('main Server is listening 80');
});
const koa = require('koa');
const koaRouter = require('koa-router');
const fs = require('fs');
const static = require('koa-static');
const cors = require('koa2-cors');

const dataserver = require('./api-server-rx.js');

const apiRouter = require('./routes/api');

const app = new koa();
const router = new koaRouter();


router.use('/api', apiRouter.routes(), apiRouter.allowedMethods());
router.get('/', async (ctx) => {
    let homepage = fs.createReadStream('./src/library/index.html');
    ctx.response.type = 'html';
    ctx.body = homepage;
});

app.use(cors());
app.use(static('./src/library'));
app.use(router.routes(), router.allowedMethods());
app.use(async (ctx, next) => {
    await next();
    if(ctx.response.status = 404) {
        ctx.response.status = 200;
        ctx.body = '404 not found';
    }
});

app.listen(80, (ctx) => {
    console.log('listening');
});


const img_server = new koa();
img_server.use(static('./img'))
img_server.listen(3001);


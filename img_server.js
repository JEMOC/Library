const koa = require('koa');
const static = require('koa-static');
const img_server = new koa();
img_server.use(static('./img'))
img_server.listen(3001);

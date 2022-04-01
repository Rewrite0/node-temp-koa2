import Koa from 'koa'
import resource from 'koa-static'
import logger from 'koa-logger'
import koaBody from 'koa-body'
import cors from 'koa2-cors'
import path from 'path'
import router from './routes/index.js'
import errorHandler from './middleware/errorHandler.js'
import dataFormatting from './middleware/dataFormatting.js'

const app = new Koa();

const __dirname = path.resolve('./');

// 跨域
app.use(cors({
	origin(ctx) {
		// 请求域名
		const url = ctx.header.referer.slice(0, -1);
		// 白名单
		const whiteList = ['http://localhost:3000'];
		// 允许白名单中的域名跨域访问
		if(whiteList.includes(url)) return url;
	}
}));
app.use(errorHandler);
app.use(dataFormatting);
app.use(logger());
app.use(resource('./public/uploads'));

app.use(koaBody({
	multipart: true, // 文件上传
	formidable: {
		uploadDir: path.join(__dirname, 'public/upload'), // 文件上传存放目录
		maxFieldsSize: 100 * 1024 * 1024,	// 限制文件大小
		keepExtensions: true, // 保留后缀
	}
}))

app.use(router.routes(), router.allowedMethods());

app.listen(2000);

console.log('服务地址:', 'http://localhost:2000');
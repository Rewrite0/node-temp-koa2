import Koa from 'koa'
import resource from 'koa-static'
import logger from 'koa-logger'
import koaBody from 'koa-body'
import cors from 'koa2-cors'
import path from 'path'
import router from './src/routes/index.js'
import errorHandler from './src/middleware/errorHandler.js'
import dataFormatting from './src/middleware/dataFormatting.js'
import config from './config.js';

const app = new Koa();

// 跨域
app.use(cors({
	origin(ctx) {
		// 请求域名
		const url = ctx.header.origin;
		// 白名单
		const whiteList = config.whiteList;
		// 允许白名单中的域名跨域访问
		if(whiteList.includes(url)) return url;
	}
}));
app.use(logger());
app.use(errorHandler);
app.use(dataFormatting);
app.use(resource(config.publicDir));

app.use(koaBody({
	multipart: true, // 文件上传
	formidable: {
		uploadDir: path.resolve(config.uploadDir), // 文件上传存放目录
		maxFieldsSize: config.maxFileSize,	// 限制文件大小
		keepExtensions: true, // 保留后缀
	}
}))

app.use(router.routes(), router.allowedMethods());

app.listen(config.port);

console.log(`服务地址: http://localhost:${config.port}`);
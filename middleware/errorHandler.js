const errorHandler = async (ctx, next) => {
	try {

		ctx.error = (code, message) => {
      if (typeof code === 'string') message = code;
      ctx.throw(code || 500, message || '服务器错误');
    };

		await next();
	} catch (error) {
		ctx.body = {
			status: error.status,
			message: error.message
		}
	}
}

export default errorHandler;
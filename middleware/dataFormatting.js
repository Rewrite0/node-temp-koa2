const dataFormatting = async (ctx, next) => {
	await next();

	if(ctx.body) {
		ctx.body = {
			status: ctx.status,
			data: ctx.body
		}
	}
};

export default dataFormatting;
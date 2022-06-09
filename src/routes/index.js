import Router from "koa-router";
import publicRouter from './public.js'

const router = new Router();

router.use(publicRouter.routes(), publicRouter.allowedMethods());

export default router;
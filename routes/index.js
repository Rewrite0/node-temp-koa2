import Router from "koa-router";
import { hello } from '../controllers/hello.js';

const router = new Router();

router.get('/', hello)

export default router;
import Router from 'koa-router';
import ctr from '#ctr';

const router = Router();

router.get('/', ctr.hello);

export default router;
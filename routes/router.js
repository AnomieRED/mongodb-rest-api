import Router from 'express';
import Controller from '../controllers/controller.js';

const router = new Router();

router.post('/product', Controller.addOne);
router.get('/product', Controller.getAll);
router.get('/product/:id', Controller.getOne);
router.put('/product', Controller.update);
router.delete('/product/:id', Controller.delete);

export default router;

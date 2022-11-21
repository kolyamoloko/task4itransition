const Router = require('express').Router;
const userController = require('../controllers/user-controller');
const router = new Router();
const authMiddleware = require('../middlewares/auth-middleware');

router.post('/registration',
    userController.registration
);
router.post('/login', userController.login);
router.post('/logout', userController.logout);
router.post('/block', userController.block);
router.get('/refresh', userController.refresh);
router.get('/users', authMiddleware, userController.getUsers);
router.delete('/delete', userController.delete);

module.exports = router;
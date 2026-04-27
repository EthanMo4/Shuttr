const router = require('express').Router();
const controller = require('./controller');

router.post('/login', controller.login);
router.post('/register', controller.register);
router.get('/profile', controller.verifyToken, controller.getProfile);
router.put('/profile', controller.verifyToken, controller.updateProfile);

module.exports = router;
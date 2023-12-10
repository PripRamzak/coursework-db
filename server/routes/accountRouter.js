const Router = require('express')
const router = new Router()
const AccountController = require('../controllers/accountController')
const authMiddleware = require('../middleware/authMiddleware')

router.post('/registration', AccountController.registration)
router.post('/login', AccountController.login)
router.post('/activation', authMiddleware, AccountController.activation)
router.get('/auth', authMiddleware, AccountController.check)

module.exports = router
const Router = require('express')
const router = new Router()
const AccountController = require('../controllers/accountController')
const authMiddleware = require('../middleware/authMiddleware')
const accountController = require('../controllers/accountController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/registration', AccountController.registration)
router.post('/login', AccountController.login)
router.post('/activation', authMiddleware, AccountController.activation)
router.get('/', checkRole('ADMIN'), AccountController.getAll)
router.put('/change_role', checkRole('ADMIN'), AccountController.changeRole)
router.get('/table/export', checkRole('ADMIN'), accountController.export)


module.exports = router
const Router = require('express')
const router = new Router()
const loanController = require('../controllers/loanController')
const checkRole = require('../middleware/checkRoleMiddleware')
const authMiddleware = require('../middleware/authMiddleware')

router.post('/create', checkRole('WORKER'), loanController.create)
router.post('/pay', authMiddleware, loanController.pay)
router.get('/', authMiddleware, loanController.getAll)
router.get('/table/export', checkRole('ADMIN'), loanController.export)

module.exports = router
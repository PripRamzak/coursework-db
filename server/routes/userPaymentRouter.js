const Router = require('express')
const router = new Router()
const userPaymentController = require('../controllers/userPaymentController')
const authMiddleware = require('../middleware/authMiddleware')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/', authMiddleware, userPaymentController.create)
router.get('/', authMiddleware, userPaymentController.get)
router.get('/card_statement', authMiddleware, userPaymentController.getCardStatement)
router.get('/table/export', checkRole('ADMIN'), userPaymentController.export)

module.exports = router
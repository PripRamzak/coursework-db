const Router = require('express')
const router = new Router()
const PaymentController = require('../controllers/paymentController')
const authMiddleware = require('../middleware/authMiddleware')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/', checkRole('ADMIN'), PaymentController.create)
router.get('/', authMiddleware, PaymentController.getAll)
router.put('/', checkRole('ADMIN'), PaymentController.update)
router.delete('/:id', checkRole('ADMIN'), PaymentController.deleteOne)
router.get('/table/export', checkRole('ADMIN'), PaymentController.export)

module.exports = router
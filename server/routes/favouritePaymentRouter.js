const Router = require('express')
const router = new Router()
const PaymentController = require('../controllers/paymentController')
const authMiddleware = require('../middleware/authMiddleware')
const checkRole = require('../middleware/checkRoleMiddleware')
const favouritePaymentController = require('../controllers/favouritePaymentController')

router.post('/', authMiddleware, favouritePaymentController.create)
router.get('/', authMiddleware, favouritePaymentController.get)
router.get('/:accountId/:paymentId', authMiddleware, favouritePaymentController.getOne)
router.delete('/:accountId/:paymentId', authMiddleware, favouritePaymentController.deleteOne)
router.get('/table/export', checkRole('ADMIN'), PaymentController.export)

module.exports = router
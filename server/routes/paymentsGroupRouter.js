const Router = require('express')
const router = new Router()
const PaymentsGroupController = require('../controllers/paymentsGroupController')
const authMiddleware = require('../middleware/authMiddleware')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/', checkRole('ADMIN'), PaymentsGroupController.create)
router.get('/', authMiddleware, PaymentsGroupController.getAll)
router.put('/', checkRole('ADMIN'), PaymentsGroupController.update)
router.delete('/:id', checkRole('ADMIN'), PaymentsGroupController.deleteOne)
// router.get('/table/export', checkRole('ADMIN'), PaymentController.export)

module.exports = router
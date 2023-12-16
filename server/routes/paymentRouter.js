const Router = require('express')
const router = new Router()
const PaymentController = require('../controllers/paymentController')

router.post('/', PaymentController.create)
router.get('/', PaymentController.getAll)

module.exports = router
const Router = require('express')
const router = new Router()
const cardRequestController = require('../controllers/cardRequestController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/', cardRequestController.create)
router.get('/', cardRequestController.getAll)

module.exports = router
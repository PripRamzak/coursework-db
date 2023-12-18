const Router = require('express')
const router = new Router()
const cardRequestController = require('../controllers/cardRequestController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/create', cardRequestController.create)
router.post('/change_status', cardRequestController.changeStatus)
router.get('/', cardRequestController.getAll)
router.delete('/:id', cardRequestController.deleteOne)

module.exports = router
const Router = require('express')
const router = new Router()
const cardRequestController = require('../controllers/cardRequestController')
const checkRole = require('../middleware/checkRoleMiddleware')
const authMiddleware = require('../middleware/authMiddleware')

router.post('/create', authMiddleware, cardRequestController.create)
router.post('/change_status', checkRole('WORKER'), cardRequestController.changeStatus)
router.get('/', authMiddleware, cardRequestController.getAll)
router.get('/table/export', checkRole('ADMIN'), cardRequestController.export)
router.delete('/:id', authMiddleware, cardRequestController.deleteOne)

module.exports = router
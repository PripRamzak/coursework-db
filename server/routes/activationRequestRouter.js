const Router = require('express')
const router = new Router()
const checkRole = require('../middleware/checkRoleMiddleware')
const authMiddleware = require('../middleware/authMiddleware')
const activationRequestController = require('../controllers/activationRequestController')

router.post('/', authMiddleware, activationRequestController.create)
router.get('/', checkRole('WORKER'), activationRequestController.getAll)
router.put('/', checkRole('WORKER'), activationRequestController.changeStatus)
router.get('/:accountId', authMiddleware, activationRequestController.getOne)
router.delete('/:id', activationRequestController.deleteOne)
router.get('/table/export', checkRole('ADMIN'), activationRequestController.export)

module.exports = router
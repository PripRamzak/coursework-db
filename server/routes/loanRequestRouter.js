const Router = require('express')
const router = new Router()
const loanRequestController = require('../controllers/loanRequestController')
const authMiddleware = require('../middleware/authMiddleware')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/create', authMiddleware, loanRequestController.create)
router.post('/change_status', checkRole('WORKER'), loanRequestController.changeStatus)
router.get('/', authMiddleware, loanRequestController.getAll)
router.get('/table/export', checkRole('ADMIN'), loanRequestController.export)
router.delete('/:id', checkRole('ADMIN'), loanRequestController.deleteOne)

module.exports = router
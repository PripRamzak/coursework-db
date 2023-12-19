const Router = require('express')
const router = new Router()
const cardController = require('../controllers/cardController')
const checkRole = require('../middleware/checkRoleMiddleware')
const authMiddleware = require('../middleware/authMiddleware')

router.post('/', checkRole('WORKER'), cardController.create)
router.get('/', authMiddleware, cardController.getAll)
router.get('/:id', authMiddleware, cardController.getOne)
router.get('/table/export', checkRole('ADMIN'), cardController.export)

module.exports = router
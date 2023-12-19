const Router = require('express')
const router = new Router()
const personController = require('../controllers/personController')
const checkRole = require('../middleware/checkRoleMiddleware')
const authMiddleware = require('../middleware/authMiddleware')

router.post('/', authMiddleware, personController.create)
router.get('/', authMiddleware, personController.getAll)
router.get('/:id', authMiddleware, personController.getOne)
router.get('/table/export', checkRole('ADMIN'), personController.export)

module.exports = router
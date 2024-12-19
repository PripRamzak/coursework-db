const Router = require('express')
const router = new Router()
const cardTypeController = require('../controllers/cardTypeController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/', checkRole('ADMIN'), cardTypeController.create)
router.get('/', cardTypeController.getAll)
router.put('/', checkRole('ADMIN'), cardTypeController.update)
router.get('/table/export', checkRole('ADMIN'), cardTypeController.export)


module.exports = router
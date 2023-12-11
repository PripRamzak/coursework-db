const Router = require('express')
const router = new Router()
const cardTypeController = require('../controllers/cardTypeController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/', checkRole('ADMIN'), cardTypeController.create)
router.get('/', cardTypeController.getAll)

module.exports = router
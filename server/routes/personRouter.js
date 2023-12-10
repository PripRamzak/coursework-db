const Router = require('express')
const router = new Router()
const personController = require('../controllers/personController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/', personController.create)
router.get('/', personController.getAll)
router.get('/:id', personController.getOne)

module.exports = router
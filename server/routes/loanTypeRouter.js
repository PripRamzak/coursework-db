const Router = require('express')
const router = new Router()
const loanTypeController = require('../controllers/loanTypeController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/', checkRole('ADMIN'), loanTypeController.create)
router.get('/', loanTypeController.getAll)

module.exports = router
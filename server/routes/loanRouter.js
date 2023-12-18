const Router = require('express')
const router = new Router()
const loanController = require('../controllers/loanController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/', checkRole('WORKER'), loanController.create)
router.get('/', loanController.getAll)

module.exports = router
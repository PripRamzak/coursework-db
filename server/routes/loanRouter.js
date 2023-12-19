const Router = require('express')
const router = new Router()
const loanController = require('../controllers/loanController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/create', checkRole('WORKER'), loanController.create)
router.post('/pay', loanController.pay)
router.get('/', loanController.getAll)

module.exports = router
const Router = require('express')
const router = new Router()
const loanRequestController = require('../controllers/loanRequestController')

router.post('/create', loanRequestController.create)
router.post('/change_status', loanRequestController.changeStatus)
router.get('/', loanRequestController.getAll)

module.exports = router
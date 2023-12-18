const Router = require('express')
const router = new Router()
const loanRequestController = require('../controllers/loanRequestController')

router.post('/', loanRequestController.create)
router.get('/', loanRequestController.getAll)

module.exports = router
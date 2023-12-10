const Router = require('express')
const router = new Router()
const deviceRouter = require('./deviceRouter')
const accountRouter = require('./accountRouter')
const personRouter = require('./personRouter')
const cardRouter = require('./cardRouter')
const cardTypeRouter = require('./cardTypeRouter')
const cardRequestRouter = require('./cardRequestRouter')
const brandRouter = require('./brandRouter')
const typeRouter = require('./cardTypeRouter')

router.use('/account', accountRouter)
router.use('/person', personRouter)
router.use('/card', cardRouter)
router.use('/cardtype', cardTypeRouter)
router.use('/cardrequest', cardRequestRouter)
router.use('/device', deviceRouter)
router.use('/brand', brandRouter)
router.use('/type', typeRouter)


module.exports = router
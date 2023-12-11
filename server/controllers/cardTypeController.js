const uuid = require('uuid')
const path = require('path')
const { CardType } = require('../models/models')
const apiError = require('../error/apiError')

class CardTypeController {
    async create(req, res, next) {
        const { name, description } = req.body
        const { img } = req.files

        if (!name || !description || !img) {
            return next(apiError.badRequest('Incorrect input data'))
        }

        let fileName = uuid.v4() + ".jpg"
        img.mv(path.resolve(__dirname, '..', 'static', fileName))

        const type = await CardType.create({ name, description, img: fileName })
        return res.json(type)
    }
    async getAll(req, res) {
        const types = await CardType.findAll()
        return res.json(types)
    }
}

module.exports = new CardTypeController()
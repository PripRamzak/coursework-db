const { Brand } = require('../models/models')
const apiError = require('../error/apiError')

class BrandController {
    async create(req, res) {
        const { name } = req.body
        if (!name) {
            return next(ApiError.badRequest('Incorrect name'))
        }
        const brand = await Brand.create({ name })
        return res.json(brand)
    }

    async getAll(req, res) {
        const brands = await Brand.findAll()
        return res.json(brands)
    }
}

module.exports = new BrandController()
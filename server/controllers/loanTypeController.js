const uuid = require('uuid')
const path = require('path')
const { LoanType } = require('../models/models')
const apiError = require('../error/apiError')

class LoanTypeController {
    async create(req, res, next) {
        const { name, annual_interest_rate, min_amount, max_amount, min_term, max_term, description } = req.body
        const { img } = req.files

        if (!name || !annual_interest_rate || !min_amount || !max_amount || !min_term || !max_term || !description || !img) {
            return next(apiError.badRequest('Incorrect input data'))
        }

        let fileName = uuid.v4() + ".jpg"
        img.mv(path.resolve(__dirname, '..', 'static', fileName))

        const type = await LoanType.create({ name, annual_interest_rate, min_amount, max_amount, min_term, max_term, description, img: fileName })
        return res.json(type)
    }
    async getAll(req, res) {
        const types = await LoanType.findAll()
        return res.json(types)
    }
}

module.exports = new LoanTypeController()
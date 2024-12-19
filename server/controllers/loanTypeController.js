const uuid = require('uuid')
const path = require('path')
const sequelize = require('../db')
const { LoanType } = require('../models/models')
const apiError = require('../error/apiError')
const ApiError = require('../error/apiError')

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

    async update(req, res, next) {
        const { id, name, min_amount, max_amount, min_term, max_term, annual_interest_rate, description } = req.body

        if (!name) {
            return next(ApiError.badRequest('Название кредита обязательно'))
        }
        else if (min_amount <= 0 || max_amount <= 0) {
            return next(ApiError.badRequest('Введите корректную сумму'))
        }
        else if (min_term <= 0 || max_term <= 0) {
            return next(ApiError.badRequest('Введите корректный срок'))
        }
        else if (annual_interest_rate <= 0 || annual_interest_rate >= 100) {
            return next(ApiError.badRequest('Введите корректную ставку'))
        }
        else if (!description) {
            return next(ApiError.badRequest('Описане кредита обязательно'))
        }

        const sameLoanType = await LoanType.findOne({ where: { name } })
        if (sameLoanType && sameLoanType.id !== id) {
            return next(ApiError.badRequest('Такой кредит уже существует'))
        }

        const loanType = await LoanType.findOne({ where: { id } })
        loanType.name = name
        loanType.min_amount = min_amount
        loanType.max_amount = max_amount
        loanType.min_term = min_term
        loanType.max_term = max_term
        loanType.annual_interest_rate = annual_interest_rate
        loanType.description = description
        await loanType.save()

        return res.json(loanType)
    }

    async export(req, res) {
        await sequelize.query("COPY loan_types TO '/tmp/loan_types.csv' DELIMITER ',' CSV HEADER", {
            model: LoanType,
            mapToModel: true
        })

        return res.json({ message: 'Export successed' })
    }
}

module.exports = new LoanTypeController()
const { Loan } = require('../models/models')
const apiError = require('../error/apiError')

class CardController {
    async create(req, res, next) {
        const { amount, years } = req.body
        if (!amount || !years) {
            next(apiError.badRequest('Incorrect amount or years'))
        }

        const date = new Date()
        const expire_date = new Date(`${request_date.getFullYear() + years}-${request_date.getMonth()}`)

        const person = await Loan.create({ date, expire_date, amount })
        return res.json(person)
    }

    async getAll(req, res) {
        const { personId } = req.query
        let loans

        if (!personId) {
            loans = await Loan.findAll()
        }
        else {
            loans = await Loan.findAll({ where: { personId } })
        }

        return res.json(loans)
    }

    async getOne(req, res) {
        const { id } = req.params

        const loan = Loan.findOne({ where: { id } })
        return res.json(loan)
    }
}

module.exports = new CardController()
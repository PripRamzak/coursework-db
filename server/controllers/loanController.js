const { Loan, LoanRequest, LoanType } = require('../models/models')
const apiError = require('../error/apiError')

class loanController {
    async create(req, res, next) {
        const { requestId } = req.body

        if (!requestId) {
            next(apiError.badRequest('Incorrect request ID'))
        }

        const request = await LoanRequest.findOne({ where: { id: requestId } })
        const type = await LoanType.findOne({ where: { id: request.loanTypeId } })

        const payment = Number(request.amount *
            (type.annual_interest_rate / (100 * 12) / (1 - Math.pow((1 + type.annual_interest_rate / (100 * 12)), -1 * request.years * 12)))).toFixed(2)

        const amount = Number(payment * 12 * request.years).toFixed(2)

        const date = new Date()
        const expire_date = new Date(`${date.getFullYear() + request.years}-${date.getMonth() + 1}-${date.getDate()}`)

        const loan = await Loan.create({ date, expire_date, amount, payment, personId: request.personId, loanTypeId: request.loanTypeId })
        return res.json(loan)
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

module.exports = new loanController()
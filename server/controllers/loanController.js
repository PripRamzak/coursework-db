const sequelize = require('../db')
const { Loan, LoanRequest, LoanType, Card } = require('../models/models')
const ApiError = require('../error/apiError')

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

    async pay(req, res, next) {
        const { loanId } = req.body

        const loan = await Loan.findOne({ where: { id: loanId } })

        if (!loan) {
            return next(ApiError.badRequest('Incorrect input data'))
        }

        loan.amount -= loan.payment
        loan.amount = Number(loan.payment).toFixed(2)
        await loan.save()

        return res.json(loan)
    }

    async getAll(req, res) {
        const { personId, typeId } = req.query
        let loans

        if (!personId && !typeId) {
            loans = await Loan.findAll()
        }
        else if (!personId) {
            loans = await Loan.findAll({ where: { loanTypeId: typeId } })
        }
        else if (!typeId) {
            loans = await Loan.findAll({ where: { personId } })
        }
        else {
            loans = await Loan.findAll({ where: { loanTypeId: typeId, personId } })
        }

        return res.json(loans)
    }

    async getCountByLoanId(req, res) {
        const loans = await Loan.findAll({
            attributes: ['loanTypeId', [sequelize.fn('COUNT', sequelize.col('id')), 'count']],
            group: ['loanTypeId']
        })

        return res.json(loans)
    }

    async getOne(req, res) {
        const { id } = req.params

        const loan = Loan.findOne({ where: { id } })
        return res.json(loan)
    }

    async export(req, res) {
        await sequelize.query("COPY loans TO '/tmp/loans.csv' DELIMITER ',' CSV HEADER", {
            model: Loan,
            mapToModel: true
        })

        return res.json({message: 'Export successed'})
    }
}

module.exports = new loanController()
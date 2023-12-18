const uuid = require('uuid')
const path = require('path')
const { LoanRequest } = require('../models/models')
const ApiError = require('../error/apiError')

class LoanRequestController {
    async create(req, res, next) {
        const { amount, years, personId, typeId } = req.body
        const { file } = req.files

        if (!amount || !years || !personId || !typeId || !file) {
            return next(ApiError.badRequest('Incorrect input data'))
        }

        const date = new Date();

        let fileName = uuid.v4() + ".pdf"
        file.mv(path.resolve(__dirname, '..', 'static', fileName))

        const request = await LoanRequest.create({amount, years, date, file_document: fileName, personId, loanTypeId: typeId })
        return res.json(request)
    }
    async changeStatus(req, res) {
        const { cardRequestId, newStatus } = req.body
        const request = await LoanRequest.findOne({ where: { id: cardRequestId } })

        request.status = newStatus
        await request.save()

        return res.json(request)
    }
    async getAll(req, res) {
        const { personId } = req.query
        let requests;

        console.log(personId)

        if (!personId) {
            requests = await LoanRequest.findAll()
        }
        else {
            requests = await LoanRequest.findAll({ where: { personId } })
        }

        return res.json(requests)
    }
}

module.exports = new LoanRequestController()
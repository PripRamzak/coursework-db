const { Payment, Card, UserPayment, FavouritePayment } = require('../models/models')
const sequelize = require('../db')
const ApiError = require('../error/apiError')

class FavouritePaymentController {
    async create(req, res, next) {
        const { accountId, paymentId } = req.body

        if (!accountId || !paymentId)
            return

        const favouritePayment = await FavouritePayment.create({ accountId, paymentId })

        return res.json(favouritePayment)
    }

    async get(req, res) {
        const { accountId } = req.query

        if (!accountId)
            return

        const favouritePayments = await FavouritePayment.findAll({
            where: { accountId },
            include: Payment
        })

        return res.json(favouritePayments)
    }

    async getOne(req, res) {
        const { accountId, paymentId } = req.params

        if (!accountId || !paymentId)
            return;

        const favouritePayment = await FavouritePayment.findOne({ where: { accountId, paymentId } })
        return res.json(favouritePayment);
    }

    async deleteOne(req, res) {
        const { accountId, paymentId } = req.params

        const request = await FavouritePayment.findOne({ where: { accountId, paymentId } })
        await request.destroy()

        return res.json({message: 'Successfuly deleted'})
    }

    async export(req, res) {
        await sequelize.query("COPY payments TO '/tmp/payments.csv' DELIMITER ',' CSV HEADER", {
            model: Payment,
            mapToModel: true
        })

        return res.json({ message: 'Export successed' })
    }
}

module.exports = new FavouritePaymentController()
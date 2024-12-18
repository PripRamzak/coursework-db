const uuid = require('uuid')
const path = require('path')
const sequelize = require('../db')
const { CardType } = require('../models/models')
const apiError = require('../error/apiError')
const ApiError = require('../error/apiError')

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

    async update(req, res, next) {
        const { id, name, description } = req.body

        if (!name) {
            return next(ApiError.badRequest('Название карты обязательно'))
        }
        else if (!description) {
            return next(ApiError.badRequest('Описане карты обязательно'))
        }

        const sameCardType = await CardType.findOne({ where: { name } })
        if (sameCardType && sameCardType.id !== id) {
            return next(ApiError.badRequest('Такая карта уже существует'))
        }

        const cardType = await CardType.findOne({ where: { id } })
        cardType.name = name
        cardType.description = description
        await cardType.save()

        return res.json(cardType)
    }

    async export(req, res) {
        await sequelize.query("COPY card_types TO '/tmp/card_types.csv' DELIMITER ',' CSV HEADER", {
            model: CardType,
            mapToModel: true
        })

        return res.json({ message: 'Export successed' })
    }
}

module.exports = new CardTypeController()
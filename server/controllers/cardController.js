const { Card } = require('../models/models')
const sequelize = require('../db')
const apiError = require('../error/apiError');

function getRandomInt(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min) + min);
}

class CardController {
    async create(req, res, next) {
        const { personId, cardTypeId } = req.body

        let number = ''
        for (let i = 0; i < 4; i++) {
            number = number + getRandomInt(1000, 10000).toString()
        }

        const cvv = getRandomInt(100, 1000)

        const request_date = new Date()
        const expire_date = new Date(`${request_date.getFullYear() + 4}-${request_date.getMonth()}`)

        const person = await Card.create({ number, expire_date, cvv, personId, cardTypeId })
        return res.json(person)
    }

    async getAll(req, res) {
        const { personId, typeId } = req.query
        let cards;

        if (!personId && !typeId) {
            cards = await Card.findAll()
        }
        else if (!personId) {
            cards = await Card.findAll({ where: { cardTypeId: typeId } })
        }
        else if (!typeId) {
            cards = await Card.findAll({ where: { personId } })
        }
        else {
            cards = await Card.findAll({ where: { cardTypeId: typeId, personId } })
        }

        return res.json(cards)
    }

    async getCountByCardId(req, res) {
        const cards = await Card.findAll({
            attributes: ['cardTypeId', [sequelize.fn('COUNT', sequelize.col('id')), 'count']],
            group: ['cardTypeId']
        })

        return res.json(cards)
    }

    async getOne(req, res) {
        const { id } = req.params

        const card = Card.findOne({ where: { id } })
        return res.json(card)
    }

    async export(req, res) {
        await sequelize.query("COPY cards TO '/tmp/cards.csv' DELIMITER ',' CSV HEADER", {
            model: Card,
            mapToModel: true
        })

        return res.json({ message: 'Export successed' })
    }
}

module.exports = new CardController()
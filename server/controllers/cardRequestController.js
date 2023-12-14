const { CardRequest } = require('../models/models')
const apiError = require('../error/apiError')

class CardRequestController {
    async create(req, res) {
        const { personId, typeId } = req.body
        const date = new Date();
        const card_request = await CardRequest.create({ date, personId, cardTypeId: typeId })
        return res.json(card_request)
    }
    async getAll(req, res) {
        const { personId } = req.query
        let requests;

        console.log(personId)

        if (!personId) {
            requests = await CardRequest.findAll()
        }
        else {
            requests = await CardRequest.findAll({ where: { personId } })
        }

        return res.json(requests)
    }
}

module.exports = new CardRequestController()
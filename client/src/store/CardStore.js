import { makeAutoObservable } from 'mobx'

export default class CardStore {
    constructor() {
        this._cards = []
        this._types = []
        this._requests = []
        makeAutoObservable(this)
    }

    setCards(cards) {
        this._cards = cards
    }

    setTypes(types) {
        this._types = types
    }

    setRequests(requests) {
        this._requests = requests
    }

    get cards() {
        return this._cards
    }

    get types() {
        return this._types
    }

    get requests() {
        return this._requests
    }
}
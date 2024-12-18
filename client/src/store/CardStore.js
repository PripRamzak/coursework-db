import { makeAutoObservable } from 'mobx'

export default class CardStore {
    constructor() {
        this._cards = []
        this._types = []
        this._requests = []
        makeAutoObservable(this)
    }

    setUserCards(cards) {
        this._cards = cards
    }

    setTypes(types) {
        this._types = types
    }

    setUserRequests(requests) {
        this._requests = requests
    }

    get userCards() {
        return this._cards
    }

    get types() {
        return this._types
    }

    get userRequests() {
        return this._requests
    }
}
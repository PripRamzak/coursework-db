import { makeAutoObservable } from 'mobx'

export default class CardStore {
    constructor() {
        this._types = []
        makeAutoObservable(this)
    }

    setTypes(types) {
        this._types = types
    }

    get types() {
        return this._types
    }
}
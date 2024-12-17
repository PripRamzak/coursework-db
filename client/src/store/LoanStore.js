import { makeAutoObservable } from 'mobx'

export default class LoanStore {
    constructor() {
        this._loans = []
        this._types = []
        this._requests = []
        makeAutoObservable(this)
    }

    setUserLoans(loans) {
        this._loans = loans
    }

    setTypes(types) {
        this._types = types
    }

    setUserRequests(requests) {
        this._requests = requests
    }

    get userLoans() {
        return this._loans
    }

    get types() {
        return this._types
    }

    get userRequests() {
        return this._requests
    }
}
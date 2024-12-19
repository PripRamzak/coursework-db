import { makeAutoObservable } from 'mobx'

export default class AccountStore {
    constructor() {
        this._isAuth = false
        this._account = {}
        this._activationRequest = null
        makeAutoObservable(this)
    }

    setIsAuth(bool) {
        this._isAuth = bool
    }

    setAccount(account) {
        this._account = account
    }

    setActivationRequest(request) {
        this._activationRequest = request
    }

    get isAuth() {
        return this._isAuth;
    }

    get id() {
        return this._account.id
    }

    get personId() {
        return this._account.personId
    }

    get role() {
        return this._account.role
    }

    get status() {
        return this._account.status
    }

    get activationRequest() {
        return this._activationRequest
    }
}
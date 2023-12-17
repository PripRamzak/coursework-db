import { $authHost, $host } from "./index"

export const createPayment = async (amount, code, cardId) => {
    const { data } = await $authHost.post('api/payment', { amount, code, type: 'Оплата', cardId })
    return data
}

export const fetchPayments = async (cardId) => {
    const { data } = await $authHost.get('api/payment', {
        params:
        {
            cardId
        }
    })
    return data
}
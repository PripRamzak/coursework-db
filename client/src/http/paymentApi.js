import { $authHost, $host } from "./index"

export const createPayment = async (amount, receiver, cardId) => {
    const { data } = await $authHost.post('api/payment', { amount, receiver, type: 'Оплата', cardId })
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
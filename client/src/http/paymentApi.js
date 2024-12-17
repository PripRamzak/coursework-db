import { $authHost } from "./index"

export const createPaymentsGroup = async (name, parentId) => {
    const { data } = await $authHost.post('api/payments_group', { name, parentId })
    return data
}

export const createPayment = async (name, paymentsGroupId, paymentParameters) => {
    const { data } = await $authHost.post('api/payment', { name, paymentsGroupId, paymentParameters })
    return data
}

export const createUserPayment = async (amount, payemntData, cardId, paymentId) => {
    const { data } = await $authHost.post('api/user_payment', { amount, type: 'Оплата', data: payemntData, cardId, paymentId })
    return data
}

export const createMoneyTransfer = async(senderCardId, receiverCardNumber, amount) => {
    const {data} = await $authHost.post('api/user_payment/transfer', {senderCardId, receiverCardNumber, amount})
    return data
}

export const createLoanPaymment = async(cardId, loanId, amount) => {
    const {data} = await $authHost.post('api/user_payment/pay_loan', {cardId, loanId, amount})
    return data
}

export const createFavouritePayment = async (accountId, paymentId) => {
    const { data } = await $authHost.post('api/favourite_payment', { accountId, paymentId })
    return data
}

export const fetchPaymentsGroup = async (parentId) => {
    console.log(parentId);
    const { data } = await $authHost.get('api/payments_group', {
        params:
        {
            parentId
        }
    })
    return data
}

export const fetchPayments = async (paymentsGroupId) => {
    const { data } = await $authHost.get('api/payment', {
        params:
        {
            paymentsGroupId
        }
    })
    return data
}

export const fetchUserPayments = async (cardId) => {
    const { data } = await $authHost.get('api/user_payment', {
        params:
        {
            cardId
        }
    })
    return data
}

export const fetchOneFavouritePayment = async (accountId, paymentId) => {
    const { data } = await $authHost.get(`api/favourite_payment/${accountId}/${paymentId}`)
    return data
}

export const fetchFavoutirePayments = async (accountId) => {
    const { data } = await $authHost.get('api/favourite_payment', {
        params:
        {
            accountId
        }
    })
    return data
}

export const fetchCardStatement = async (cardId) => {
    const { data } = await $authHost.get('api/user_payment/card_statement', {
        params:
        {
            cardId
        }
    })
    return data
}

export const deleteFavouritePayment = async (accountId, paymentId) => {
    const { data } = await $authHost.delete(`api/favourite_payment/${accountId}/${paymentId}`)
    return data
}

export const exportPayments = async () => {
    const { data } = await $authHost.get('api/payment/table/export')
    return data
}
import { $authHost, $host } from "./index"

export const createCard = async (personId, cardTypeId) => {
    const { data } = await $authHost.post('api/card', { personId, cardTypeId })
    return data
}

export const fetchCards = async (personId, typeId) => {
    const { data } = await $authHost.get('api/card', {
        params:
        {
            personId,
            typeId
        }
    })
    return data
}

export const createCardRequest = async (personId, typeId) => {
    const { data } = await $authHost.post('api/card_request/create', { personId, typeId })
    return data
}

export const changeCardRequestStatus = async (cardRequestId, newStatus) => {
    const { data } = await $authHost.post('api/card_request/change_status', { cardRequestId, newStatus })
    return data
}

export const fetchCardRequests = async (personId) => {
    const { data } = await $authHost.get('api/card_request', {
        params:
        {
            personId
        }
    })
    return data
}

export const deleteCardRequest = async (id) => {
    const { data } = await $authHost.delete('api/card_request/' + id)
    return data
}

export const createCardType = async (type) => {
    const { data } = await $authHost.post('api/card_type', type)
    return data
}

export const fetchCardTypes = async () => {
    const { data } = await $host.get('api/card_type')
    return data
}
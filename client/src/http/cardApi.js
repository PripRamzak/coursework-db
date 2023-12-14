import { $authHost, $host } from "./index"

export const fetchCards = async (personId) => {
    const { data } = await $authHost.get('api/card', {
        params:
        {
            personId
        }
    })
    return data
}

export const createCardRequest = async (personId, typeId) => {
    const { data } = await $authHost.post('api/card_request', { personId, typeId })
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

export const createCardType = async (type) => {
    const { data } = await $authHost.post('api/card_type', type)
    return data
}

export const fetchCardTypes = async () => {
    const { data } = await $host.get('api/card_type')
    return data
}
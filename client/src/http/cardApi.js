import { $authHost, $host } from "./index"

export const createCardType = async (type) => {
    const { data } = await $authHost.post('api/cardtype', type)
    return data
}

export const fetchCardTypes = async () => {
    const { data } = await $host.get('api/cardtype')
    return data
}
import { $authHost, $host } from "./index"

export const createLoanType = async (type) => {
    const { data } = await $authHost.post('api/loan_type', type)
    return data
}

export const fetchLoanTypes = async () => {
    const { data } = await $host.get('api/loan_type')
    return data
}
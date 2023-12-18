import { $authHost, $host } from "./index"

export const fetchLoans = async (personId) => {
    const { data } = await $authHost.get('api/loan',
        {
            params:
            {
                personId
            }
        })
    return data
}

export const createLoanRequest = async (request) => {
    const { data } = await $authHost.post('api/loan_request', request)
    return data
}

export const createLoanType = async (type) => {
    const { data } = await $authHost.post('api/loan_type', type)
    return data
}

export const fetchLoanTypes = async () => {
    const { data } = await $host.get('api/loan_type')
    return data
}
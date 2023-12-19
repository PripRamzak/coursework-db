import { $authHost, $host } from "./index"

export const createLoan = async (requestId) => {
    const { data } = await $authHost.post('api/loan/create', { requestId })
    return data
}

export const payLoan = async (loanId) => {
    const { data } = await $authHost.post('api/loan/pay', { loanId })
    return data
}

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
    const { data } = await $authHost.post('api/loan_request/create', request)
    return data
}

export const changeLoanRequestStatus = async (loanRequestId, newStatus) => {
    const { data } = await $authHost.post('api/loan_request/change_status', { loanRequestId, newStatus })
    return data
}

export const fetchLoanRequests = async (personId) => {
    const { data } = await $authHost.get('api/loan_request', {
        params:
        {
            personId
        }
    })
    return data
}

export const deleteLoanRequest = async (id) => {
    const { data } = await $authHost.delete('api/loan_request/' + id)
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
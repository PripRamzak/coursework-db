import { $authHost, $host } from "./index"

export const createLoan = async (requestId) => {
    const { data } = await $authHost.post('api/loan/create', { requestId })
    return data
}

export const payLoan = async (loanId) => {
    const { data } = await $authHost.post('api/loan/pay', { loanId })
    return data
}

export const fetchLoans = async (personId, typeId) => {
    const { data } = await $authHost.get('api/loan',
        {
            params:
            {
                personId,
                typeId
            }
        })
    return data
}

export const fetchLoansCount = async () => {
    const { data } = await $authHost.get('api/loan/count')
    return data
}

export const exportLoans = async () => {
    const { data } = await $authHost.get('api/loan/table/export')
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

export const exportLoanRequests = async () => {
    const { data } = await $authHost.get('api/loan_request/table/export')
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

export const updateLoanTypes = async (id, name, min_amount, max_amount, min_term, max_term, annual_interest_rate, description) => {
    const { data } = await $authHost.put('api/loan_type', { id, name, min_amount, max_amount, min_term, max_term, annual_interest_rate, description })
    return data
}

export const exportLoanTypes = async () => {
    const { data } = await $authHost.get('api/loan_type/table/export')
    return data
}
import { $authHost, $host } from "./index"
import { jwtDecode } from 'jwt-decode'

export const registration = async (email, password, status) => {
    const { data } = await $host.post('api/account/registration', { email, password, status })
    localStorage.setItem('token', data.token)
    return jwtDecode(data.token)
}

export const login = async (email, password) => {
    const { data } = await $host.post('api/account/login', { email, password })
    localStorage.setItem('token', data.token)
    return jwtDecode(data.token)
}

export const activation = async (account_id, person_id) => {
    const { data } = await $authHost.post('api/account/activation', { account_id, person_id })
    localStorage.setItem('token', data.token)
    return jwtDecode(data.token)
}

export const fetchUsers = async (role) => {
    const { data } = await $authHost.get('api/account',
        {
            params:
            {
                role
            }
        })
    return data
}

export const changeRole = async (id, role) => {
    const { data } = await $authHost.put('api/account/change_role', { id, role })
    return data
}

export const exportAccounts = async () => {
    const { data } = await $authHost.get('api/account/table/export')
    return data
}

export const check = async () => {
    const { data } = await $authHost.get('api/account/auth')
    localStorage.setItem('token', data.token)
    return jwtDecode(data.token)
}

export const createPerson = async (last_name, first_name, middle_name, ident_number, birth, sex) => {
    const { data } = await $authHost.post('api/person', { last_name, first_name, middle_name, ident_number, birth, sex })
    return data
}

export const fetchPersons = async () => {
    const { data } = await $authHost.get('api/person')
    return data
}

export const exportPersons = async () => {
    const { data } = await $authHost.get('api/person/table/export')
    return data
}
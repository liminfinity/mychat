import {object, string} from 'yup'


export const loginShema = object({
    email: string().required('Email is a required field').email('Not available syntax'),
    password: string().required('Password is a required field').min(5, "Password is too small")
})
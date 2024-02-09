import {object, string, ref} from 'yup'


export const loginShema = object({
    email: string().required('Email is a required field').email('Not available syntax'),
    password: string().required('Password is a required field').min(5, "Password is too small")
})

export const signUpShema = object({
    lastName: string().required('Last name is a required field').min(1, "Last name is too small"),
    firstName: string().required('First name is a required field').min(1, "First name is too small"),
    email: string().required('Email is a required field').email('Not available syntax'),
    password: string().required('Password is a required field').min(5, "Password is too small"),
    confirmPassword: string().required('Confirm password is a required field').oneOf([ref('password')], 'Passwords must match')
})
type FormFieldName = "firstName" | "lastName" | "email" | "password" | "confirmPassword";

export const signupItems: { name: FormFieldName; displayedName: string,type: string }[] = [
    {
        name: 'firstName',
        displayedName: 'First Name',
        type: 'text'
    },
    {
        name: 'lastName',
        displayedName: 'Last Name',
        type: 'text'
    },
    {
        name: 'email',
        displayedName: 'Email',
        type: 'email'
    },
    {
        name: 'password',
        displayedName: 'Password',
        type: 'password'
    },
    {
        name: 'confirmPassword',
        displayedName: 'Confirm password',
        type: 'password'
    }
]
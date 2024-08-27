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



export const aboutLinkDropDownItems: {name: string, location: string}[] = [
    {
        name: 'Newsroom',
        location: '/Newsroom',
    },
    {
        name: 'How We Work?',
        location: '/#HowWeWork',

    },
    {
        name: 'Help Center',
        location: '/helpcenter',
    },
    {
        name:'Supported Countries',
        location: '/suppported-countries',
    }
]
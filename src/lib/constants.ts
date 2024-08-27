import { NavbarLinksType } from "./types";

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



export const aboutLinkDropDownItems: {name: string, location: string, description: string}[] = [
    {
        name: "Newsroom",
        location: "/newsroom",
        description: "Stay updated with our latest news and events.",

    },
    {
        name: "How We Work",
        location: "/#howwework",
        description: "Discover our approach and work process.",

    },
    {
        name: "Supported Countries",
        location: "/supported-countries",
        description: "Explore the regions where we are active.",

    }
]

export const navbarLinks: {name: string, location: string, isDropDown: boolean, description: string, more?:NavbarLinksType}[] = [
    {
        name: 'Home',
        location: '/',
        isDropDown: false,
        description: "Go Back Home"
    },
    {
        name: 'Donate',
        location: '/donate',
        isDropDown: false,
        description: "Help us expand and build more blood centers",
    },
    {
        name: 'About',
        location: '/about',
        isDropDown: true,
        description: "How helper works, Newsroom, and more",
    },
    {
        name: 'Contact us',
        location: '/contact',
        isDropDown: false,
        description: "Any question? We are here for you"
    }
]
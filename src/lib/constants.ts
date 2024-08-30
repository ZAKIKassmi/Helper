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

export const cardItems:{title: string, description: string, isSignUp: boolean}[] = [
    {
        title: '1. Create an account',
        description: 'Sign up easily and join our community by filling out a simple registration form.',
        isSignUp: true,
    },
    {
        title: '2. Check Your Eligibility',
        description: 'Take a brief eligibility quiz to ensure you meet the donation criteria. You may take it later if you are not eligible now.',
        isSignUp: false,
    },
    {
        title: '3. Find a Blood Center',
        description: 'Our locator tool will help you find a nearby blood center.',
        isSignUp: false,
    },
    {
        title: '4. Book Appointment',
        description: 'Choose a convenient date and time for your first donation.',
        isSignUp: false,
    },
    {
        title: '6. Donate blood, earn credits',
        description: 'respect your appointments and earn more credits.',
        isSignUp: false,
    },
    {
        title: '5. We\'ll Handle the Rest',
        description: 'We\'ll remind you about future appointments and help you maintain a regular donation schedule.',
        isSignUp: false,
    },
    
]

export const footerItems = [
    {
        title: "Resources",
        subTitles: [
            {
                title: "Learn more",
                link: "/learnmore"
            },
            {
                title: "Analytics",
                link: "/analytics"
            },
            {
                title: "Blogs",
                link: "/blogs"
            }
        ]
    },
    {
        title: "Donate",
        subTitles: [
            {
                title: "Social impact",
                link: "/social-impact"
            },
            {
                title: "Help a person",
                link: "/help-person"
            },
            {
                title: "Crises relief",
                link: "/crises-relief"
            }
        ]
    },
    {
        title: "About",
        subTitles: [
            {
                title: "How we work",
                link: "/how-we-work"
            },
            {
                title: "How helper works",
                link: "/how-helper-works"
            },
            {
                title: "Newsroom",
                link: "/newsroom"
            },
            {
                title: "Supported countries",
                link: "/supported-countries"
            },
            {
                title: "Help Center",
                link: "/help-center"
            }
        ]
    },
    {
        title: "Legal",
        subTitles: [
            {
                title: "Privacy & Policy",
                link: "/privacy-policy"
            }
        ]
    }
];

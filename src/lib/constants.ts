import { BloodBankFacilityNameTypes, BloodBankNameType, NavbarLinksType, SignUpFormNameTypes } from "./types";


export const dashboardItems: {name: string, type: string,href:string}[] = [
    {
        name: 'Create event',
        type: 'plus',
        href: '/create-event'
    },
    {
        name: 'Overview',
        type: 'home-hospital',
        href: '/dashboard'
    },
    {
        name: 'Donors',
        type: 'donors',
        href: '/donors'
    },
    {
        name: 'Blood banks',
        type: 'cardiology',
        href: '/banks'
    },
]


export const bloodBankBasicInformationItems:  { name: BloodBankNameType; displayedName: string,type: string }[] = [
    {
        name: "name",
        displayedName: "Full Name",
        type: "text"
    },
    {
        name: "email",
        displayedName: "Email",
        type: "email"
    },
    {
        name: "password",
        displayedName: "Password",
        type: "password"
    },
    {
        name: "confirmPassword",
        displayedName: "Confirm Password",
        type: "password"
    },
    {
        name: "address",
        displayedName: "Address",
        type: "text"
    }

]

export const bloodBankFacilityDetailsItems:  { name: BloodBankFacilityNameTypes; displayedName: string,type: string }[] = [
    {
        name: "donationBeds",
        displayedName: "Number of Donation Beds/Chairs",
        type: "text"
    },
    {
        name: "capacity",
        displayedName: "Minimum number of required donor per day.",
        type: "text"
    },
    {
        name: "emergencyContact",
        displayedName: "Emergency contact information" ,
        type: "text"
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
        location: '/donation',
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


export const OperationalDetailsItems = [
    {
        dayName: "Sunday",
        switch: "SundaySwitch",
        statrsAt: "SundayStartAt",
        endsAt: "SundayEndsAt"
    },
    {
        dayName: "Monday",
        switch: "MondaySwitch",
        statrsAt: "MondayStartAt",
        endsAt: "MondayEndsAt"
    },
    {
        dayName: "Tuesday",
        switch: "TuesdaySwitch",
        statrsAt: "TuesdayStartAt",
        endsAt: "TuesdayEndsAt"
    },
    {
        dayName: "Wednesday",
        switch: "WednesdaySwitch",
        statrsAt: "WednesdayStartAt",
        endsAt: "WednesdayEndsAt"
    },
    {
        dayName: "Thursday",
        switch: "ThursdaySwitch",
        statrsAt: "ThursdayStartAt",
        endsAt: "ThursdayEndsAt"
    },
    {
        dayName: "Friday",
        switch: "FridaySwitch",
        statrsAt: "FridayStartAt",
        endsAt: "FridayEndsAt"
    },
    {
        dayName: "Saturday",
        switch: "SaturdaySwitch",
        statrsAt: "SaturdayStartAt",
        endsAt: "SaturdayEndsAt"
    },
]

export const eligibilityConditions: string[][] = [[
    "Chronic nephropathies.",
    "Chronic endocrinopathies.",
    "Diabetes.",
    "Cirrhosis.",
    "Acute or chronic hepatitis.",
    "Acquired Immunodeficiency Syndrome (AIDS).",
    "Ulcers.",
    "Asthma.",
    "Chronic hematologic disorders.",
    "Cancer.",
    "Angina pectoris.",
    "Myocardial infarction."
  ],
  [
    "Diastolic blood pressure above 10 cm Hg.",
    "Systolic blood pressure above 16 cm Hg.",
    "State of intoxication.",
    "Vaccination less than 21 days old.",
    "Serum therapy less than 15 days old.",
    "Ongoing treatment.",
    "Acute pneumonia.",
    "Acute hematologic disorders.",
    "Pregnancy.",
    "Childbirth within the last 6 months.",
    "Abortion within the last 3 months.",
    "Ongoing breastfeeding.",
    "Ongoing psychiatric treatment.",
    "Surgery within the last 3 months."
  ]

];





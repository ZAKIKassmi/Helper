import {z} from 'zod';

export enum Gender {
    Female= "Female",
    Male= "Male",
}
export const userSchema = z.object({
    firstName: z.string().trim().toLowerCase().min(1,{
        message: 'must contain at least 1 character'
    }),
    lastName: z.string().trim().toLowerCase().min(1,{
        message: 'must contain at least 1 character'
    }),
    email: z.string().trim().email({
        message: 'Email is not valid'
    }),
    password: z.string().trim().min(8, {
        message: 'Password must contain at least 8 characters',
    }),
    confirmPassword: z.string().trim().min(8,{
        message: 'Password must contain at least 8 characters',
    }),
    gender: z.nativeEnum(Gender, {
        message: "Gender is required."
    }),
    picture: typeof window === 'undefined' 
  ? z.any() 
  : z.instanceof(FileList, {
        message: "Event picture is required",
    })
    .refine((file) => file?.length > 0, 'Picture is required.')
    .refine((file) => file?.length < 2, 'Only one picture is allowed.')
    .refine((file) => {
        const validExtensions = ['jpg', 'jpeg', 'png'];
        const fileName = file?.[0]?.name?.toLowerCase();
        return validExtensions.some(ext => fileName?.endsWith(ext));
    }, 'Only jpg, jpeg, or png files are allowed.'),
    phoneNumber: z.string({
        message: "Phone number is required."
    }).min(8,{
        message: 'Phone minimum length is 8 characters'
    }).max(15,{
        message: 'Phone maximum length is 15 characters'
    }).startsWith('+',{
        message: 'Phone number must starts with +',
    }),
    dateOfBirth: z.coerce.date({
        message: "Date of birth is required",
    }),
    bloodType: z.string({
        message: "Blood type is required. If you're unsure, please select 'Unknown'."
    }),
    address: z.string({
        message: "Address is required"
    }).trim().min(1,{
        message: "Adress is required"
    }),
    zip: z.string().min(1,{
        message: "Please enter a zip code",
    }),
    province: z.string().min(1,{
        message: "Please enter a province"
    }),
    country: z.string().min(1,{
        message: "Please enter a valid country name",
    }).max(60,{
        message: "Please enter a valid country name",
    }),
    countryCode: z.number().min(1,{
        message: "Please enter a number."
    }).optional(),
});


export type TUserSchema = z.infer<typeof userSchema>; 

export const eligibilitySchema = z.object({
    isEligible: z.boolean(),
});
export type TEligibilitySchema = z.infer<typeof eligibilitySchema>; 

export const loginSchema = z.object({
    email: z.string().trim().email({
        message: 'Please Enter a valid email'
      }),
    password: z.string().trim().min(1, {
        message: 'Please enter password'
      })
  });

export type TLoginSchema = z.infer<typeof loginSchema>;


export const GoogleUserSchema = z.object({
    sub: z.string().trim(),
    name: z.string().trim(),
    given_name: z.string().trim(),
    family_name: z.string().trim(),
    picture: z.string().trim(),
    email: z.string().trim(),
    email_verified: z.boolean(),
    address: z.string().trim()
  });

export type GoogleUser = z.infer<typeof GoogleUserSchema>;

export type SignUpFormNameTypes = 'firstName' | 'lastName' | 'email' | 'password' | 'confirmPassword' | 'address';

export const  VerificationFormSchema = z.object({
verificationCode: z.string().trim().min(8).max(8),
});

export type TVerificationFormSchema = z.infer<typeof VerificationFormSchema>;


export const ResetPasswordSchema = z.object({
    email: z.string().trim().email({
    message: 'Please Enter a valid email'
    }),
});
export type TResetPasswordSchema = z.infer<typeof ResetPasswordSchema>;

export const SetNewPasswordSchema = z.object({
    password: z.string().trim().min(8, {
        message: 'Password must contain at least 8 characters',
    }),
    confirmPassword: z.string().trim().min(8,{
        message: 'Password must contain at least 8 characters',
    }),
});

export type TSetNewPasswordSchema = z.infer<typeof SetNewPasswordSchema>;

export type NavbarLinksType = {name: string, location: string, isDropDown: boolean, description: string}[];


export const BloodBankSchema = z.object({
    name: z.string().trim().min(1,{
        message: "Please enter a full name"
    }),
    email: z.string().trim().email({
        message: 'Email is not valid'
    }),
    password: z.string().trim().min(8, {
        message: 'Password must contain at least 8 characters',
    }),
    confirmPassword: z.string().trim().min(8,{
        message: 'Password must contain at least 8 characters',
    }),
    address: z.string().toLowerCase().trim().min(10,{
        message: "Please enter a valid address"
    }).max(528),
    country: z.string().min(1,{
        message: "Please enter a valid country name",
    }).max(60,{
        message: "Please enter a valid country name",
    }),
    longitude: z.number().lt(180,{
        message: "longitude must be between -180 and 180",
    }).gt(-180,{
        message: "latitude must be between -180 and 180",
    }).optional(),
    latitude: z.number().lt(90,{
        message: "latitude must be between -90 and 90",
    }).gt(-90,{
        message: "latitude must be between -90 and 90",
    }).optional(),
    zip: z.string().min(1,{
        message: "Please enter a zip code",
    }),
    province: z.string().min(1,{
        message: "Please enter a province"
    })
    //TODO: Remove optional later on
});

export type TBloodBankSchema = z.infer<typeof BloodBankSchema>;

export const facilityDetailsSchema = z.object({
    donationBeds: z.string().min(1,{
        message: "Please enter a number",
    }),
    capacity: z.string().min(1,{
        message: "Please enter a number",
    }),
    emergencyContact: z.string({
        message: "This field is required"
    }).min(8,{
        message: 'Phone minimum length is 8 characters'
    }).max(15,{
        message: 'Phone maximum length is 15 characters'
    }).startsWith('+',{
        message: 'Phone number must starts with +',
    }),
});


export type TFacilityDetails = z.infer<typeof facilityDetailsSchema>;

export type BloodBankNameType = 'name' | 'country' | 'email' | 'password' | 'confirmPassword' | 'address' | 'zip' | 'province';


export type BloodBankFacilityNameTypes = 'capacity' | 'donationBeds' | 'emergencyContact';

export type DaysType = 'Sunday'| 'Monday'| 'Tuesday'| 'Wednesday'| 'Thursday'| 'Friday'| 'Saturday';

export const OperationalDaysSchema = z.object({
    SundaySwitch: z.boolean(),
    SundayStartAt: z.string().min(1,{
        message: "Please enter a value",
    }),
    SundayEndsAt: z.string().min(1,{
        message: "Please enter a value",
    }),
    MondaySwitch: z.boolean(),
    MondayStartAt: z.string().min(1,{
        message: "Please enter a value",
    }),
    MondayEndsAt: z.string().min(1,{
        message: "Please enter a value",
    }),
    TuesdaySwitch: z.boolean(),
    TuesdayStartAt: z.string().min(1,{
        message: "Please enter a value",
    }),
    TuesdayEndsAt: z.string().min(1,{
        message: "Please enter a value",
    }),
    WednesdaySwitch: z.boolean(),
    WednesdayStartAt: z.string().min(1,{
        message: "Please enter a value",
    }),
    WednesdayEndsAt:z.string().min(1,{
        message: "Please enter a value",
    }),
    ThursdaySwitch: z.boolean(),
    ThursdayStartAt: z.string().min(1,{
        message: "Please enter a value",
    }),
    ThursdayEndsAt: z.string().min(1,{
        message: "Please enter a value",
    }),
    FridaySwitch: z.boolean(),
    FridayStartAt: z.string().min(1,{
        message: "Please enter a value",
    }),
    FridayEndsAt: z.string().min(1,{
        message: "Please enter a value",
    }),
    SaturdaySwitch: z.boolean(),
    SaturdayStartAt: z.string().min(1,{
        message: "Please enter a value",
    }),
    SaturdayEndsAt: z.string().min(1,{
        message: "Please enter a value",
    })
});

export type TOperaionalDaysSchema = z.infer<typeof OperationalDaysSchema>;


export const certificationSchema = z.object({
    licenseNumber: z.string().min(1,{
        message: "Please enter a number",
    }),
    expiryDate: z.coerce.date(),
    certifications: typeof window === 'undefined' ? z.any() : z.instanceof(FileList,{
        message: "Certification is required",
    }).refine((file)=>file?.length > 0 , 'Certification is required.').refine((file)=>file?.length < 4, 'You have exceeded the maximum number of certifications allowed.'),
});

export type TCertificationSchema = z.infer<typeof certificationSchema>;

const currentYear = new Date().getFullYear() % 100;

export const donationSchema = z.object({
    firstName: z.string().regex(new RegExp(/^[a-zA-Z]+[-'s]?[a-zA-Z ]+$/),{
        message: "First name must contain only letters."
    }).trim().min(1,{
        message: "Please enter a first name",
    }).max(255,{
        message: 'First name is too long'
    }),
    lastName: z.string().regex(new RegExp(/^[a-zA-Z]+[-'s]?[a-zA-Z ]+$/),{
        message: "First name must contain only letters."
    }).trim().min(1,{
        message: "Please enter a last name"
    }).max(255,{
        message: "Last name is too long",
    }),
    email: z.string().trim().email({
        message: 'Email is not valid'
    }),
    cardNumber: z.string().trim().min(16,{
        message: "Card number is not valid",
    }).max(16,{
        message: "Card number is not valid",
    }),
    monthYear: z.string().regex(new RegExp(`^(0[1-9]|1[0-2])\/(${currentYear}|${currentYear + 1}|[${Math.floor((currentYear + 1) / 10)}-9][0-9])$`),{
        message: `Month must be between 01 and 12 and Year must be above ${currentYear}`
    }).max(5).min(5),
    cvv: z.string().min(3,{
        message: "CVV is not valid",
    }).max(3,{
        message: "CVV is not valid"
    }),
    nameOnCard: z.string().min(1,{
        message: "Please enter a name",
    }).max(255,{
        message: "Name is too long."
    }),
    country: z.string().max(255,{
        message: "Country name is too long",
    }),
    zipCode: z.string().min(3,{
        message: "Enter a zip code",
    }).max(10,{
        message: "Zip code is too long",
    }),
    amount: z.number().lt(100_000).min(1,{
        message: "Please enter a number"
    })
});

export type TDonationSchema = z.infer<typeof donationSchema>;


export const appointmentSchema = z.object({
    bloodBank: z.string().min(1,{
        message: "This field is required",
    }),
    date: z.coerce.date({message: "Appointment date is required"}),
    time: z.string({
        message: "Appointment time is required",
    }).time(),
    interval: z.string({
        message: "This field is required",
    }),
});


export const eventFormSchema = z.object({
    title: z.string().min(4,{
        message: "Title must be at least 4 characters"
    }).max(255,{
        message: "Title is too long."
    }),
    description: z.string(),
    address: z.string().min(1,{message: "Please enter an address"}).max(255,{message: "Address is too long"}),
    date: z.coerce.date({message: "Event date is required"}),
    startsAt: z.string().time(),
    endsAt: z.string().time(),
    picture: typeof window === 'undefined' ? z.any() : z.instanceof(FileList,{
        message: "Event picture is required",
    }).refine((file)=>file?.length > 0 , 'Picture is required.').refine((file)=>file?.length < 2, 'Only one picture is allowed.'),
});

export type TEventFormSchema = z.infer<typeof eventFormSchema>;

export type TAppointmentSchema = z.infer<typeof appointmentSchema>;


export type Donors = {
    id: string;
    fullName: string;
    gender: "Male" | "Female" | "null";
    donationTime: string;
    email: string;
    phone: string;
    bloodType: "unknown" |"A+" | "A-" | "B-" | "B+" | "AB+" | "AB-" | "O+" | "O-";
    address:string;
    dateOfBirth: string;
    capacity: number;
    date: string;
  }

  export type Appointment = {
    id: string;
    donationTime: string | null;
    donationDate: string;
  }

  export type BloodBanksSettingPagePropsType = {
    id: string;
    address: string;
    name: string;
    email: string;
    country: string;
    availableBeds: number;
    dailyDonorsNeeded: number;
    emergencyContact: string | null;
    dialCode: string;
    province: string;
    zip: string;
    operationalDetails: {
      id: number,
      day: DaysType,
      isWorking: boolean,
      startsAt: string,
      endsAt: string
    }[];
}
  




import {z} from 'zod';

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
    gender: z.enum(["Male", "Female"],{
        message: "This field is Required"
    }).optional(),
    phoneNumber: z.string({
        message: "This field is required"
    }).min(8,{
        message: 'Phone minimum length is 8 characters'
    }).max(15,{
        message: 'Phone maximum length is 15 characters'
    }).startsWith('+',{
        message: 'Phone number must starts with +',
    }).optional(),
});


export type TUserSchema = z.infer<typeof userSchema>; 

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
  });

export type GoogleUser = z.infer<typeof GoogleUserSchema>;

export type SignUpFormNameTypes = 'firstName' | 'lastName' | 'email' | 'password' | 'confirmPassword';

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
    address: z.string().trim().min(10,{
        message: "Please enter a valid address"
    }).max(528),
    country: z.string().min(1,{
        message: "Please enter a valid country name",
    }).max(60,{
        message: "Please enter a valid country name",
    }),
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
    }).min(1,{
        message: "Please enter a valid emergency contact"
    })
});


export type TFacilityDetails = z.infer<typeof facilityDetailsSchema>;

export type BloodBankNameType = 'name' | 'country' | 'email' | 'password' | 'confirmPassword' | 'address';


export type BloodBankFacilityNameTypes = 'capacity' | 'donationBeds' | 'emergencyContact';



export const OperationalDaysSchema = z.object({
    SundaySwitch: z.boolean(),
    SundayStartAt: z.string(),
    SundayEndsAt: z.string(),
    MondaySwitch: z.boolean(),
    MondayStartAt: z.string(),
    MondayEndsAt: z.string(),
    TuesdaySwitch: z.boolean(),
    TuesdayStartAt: z.string(),
    TuesdayEndsAt: z.string(),
    WednesdaySwitch: z.boolean(),
    WednesdayStartAt: z.string(),
    WednesdayEndsAt:z.string(),
    ThursdaySwitch: z.boolean(),
    ThursdayStartAt: z.string(),
    ThursdayEndsAt: z.string(),
    FridaySwitch: z.boolean(),
    FridayStartAt: z.string(),
    FridayEndsAt: z.string(),
    SaturdaySwitch: z.boolean(),
    SaturdayStartAt: z.string(),
    SaturdayEndsAt: z.string()
});

export type TOperaionalDaysSchema = z.infer<typeof OperationalDaysSchema>;


export const certificationSchema = z.object({
    licenseNumber: z.string().min(1,{
        message: "Please enter a number",
    }),
    expiryDate: z.string().date(),
    certifications: z.string(),
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
    amount: z.number().lt(100_000_0).min(1,{
        message: "Please enter a number"
    })
});

export type TDonationSchema = z.infer<typeof donationSchema>;




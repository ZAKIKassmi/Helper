'use client';
import {useForm} from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { SignUpFormNameTypes, TUserSchema, userSchema } from '@/lib/types';
import { 
    Form, 
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
 } from '../ui/form';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import {signupItems} from '@/lib/constants';
import { createUser } from '@/app/(userAuth)/signup/_action/action';
import { useFormState } from 'react-dom';
import { useEffect, useState } from 'react';
import zxcvbn from 'zxcvbn';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select";
import LoginWithGoogleButton from '../login-with-google-button';
import CustomSeperator from '../custom-seperator';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Calendar } from '../ui/calendar';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import CalenderIconSVG from '../icons/calendar';
import CustomSelect from '../custom-select';
import { CalendarIcon } from 'lucide-react';
import { PhoneInput } from '../ui/phone-number';
 

export default function CustomForm() {

    const [state, formAction] = useFormState(createUser, null);
    const [passwordState, setPasswordState] = useState<'Very Weak' | 'Weak' | 'Moderate' | 'Strong' | 'Very Strong' | "">("");    
    const [date, setDate] = useState<Date>()

    const [iconColor, setIconColor] = useState('#ACACAD');
    const form = useForm<TUserSchema>({
        resolver: zodResolver(userSchema),
        defaultValues: {
            email: '',
            firstName: '',
            lastName: '',
            password: '',
            confirmPassword: '',
            address: '',
            phoneNumber: '',
        }   
    });
    const router = useRouter();
    useEffect(()=>{
        if(Array.isArray(state) && state?.length > 0){
            state.forEach((issue: {name: SignUpFormNameTypes, errorMessage: string, isToast: boolean, isError:boolean})=>{
                if(!issue.isToast){
                    form.setError(issue.name, {
                        message: issue.errorMessage
                    })
                }
                else if(issue.isToast && issue.isError){
                    toast.error(issue.errorMessage);
                }
                else if(issue.isToast && !issue.isError){
                    toast.success(issue.errorMessage);
                    router.push("/signup/email-verification");
                }
            });
        }
    },[state]);

    function evaluatePasswordStrength(password: string) {
        const result = zxcvbn(password);
        if (password.length === 0) {
          setPasswordState('');
          return;
        }
        switch (result.score) {
            case 0:
                setPasswordState('Very Weak');
                break;
            case 1:
                setPasswordState('Weak');
                break;
            case 2:
                setPasswordState('Moderate');
                break;
            case 3:
                setPasswordState('Strong');
                break;
            case 4:
                setPasswordState('Very Strong');
                break;
            default:
                setPasswordState("");
        }
    }

    async function onSubmit(data: TUserSchema){
        if(zxcvbn(data.password).score < 3){
            toast.error("Your password needs to be stronger. Please include a mix of letters, numbers, and special characters for better security.");
            return null;
        }
        if(data.password !== data.confirmPassword){
            toast.error("Passwords do not match!!");
            return null;
        }
        const formData = new FormData();
        //server actions accept FromData object
        // formData.append('firstName', data.firstName);
        // formData.append('lastName', data.lastName);
        // formData.append('email', data.email);
        // formData.append('password', data.password);
        // formData.append('confirmPassword', data.confirmPassword);
        // formData.append('dateOfBirth', String(data.dateOfBirth));
        // formData.append('gender', String(data.gender));
        // console.log(data.phoneNumber);
        // console.log(data.bloodType);
        // console.log(data.gender);
        // console.log(data.gender);


        console.log(data);
        // formData.append('gender', data.gender);
        //call the formAction
        // formAction(formData);
        
    }
  return (
    
    <Form {...form}>
        <form className='flex flex-col max-w-[500px] w-full gap-4 px-4 ' onSubmit={form.handleSubmit(onSubmit)}>

            <div className='grid grid-cols-1 gap-4 csz:grid-cols-2'>
                <FormField 
                    key="firstName"
                    name="firstName"
                    control={form.control}
                    render={({field})=>(
                    <FormItem>
                        <FormControl>
                            <Input className='focus-visible:ring-n-40 focus-visible:ring-offset-n-40' placeholder="First Name" type="text"  {...field}   
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>  
                    )}
                    >
                </FormField>

                <FormField 
                    key="lastName"
                    name="lastName"
                    control={form.control}
                    render={({field})=>(
                    <FormItem>
                        <FormControl>
                            <Input className='focus-visible:ring-n-40 focus-visible:ring-offset-n-40' placeholder="Last Name" type="text"  {...field}   
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>  
                    )}
                    >
                </FormField>

            </div>
            {
                signupItems.map((item)=>(
                    <FormField 
                        key={item.name}
                        name={item.name}
                        control={form.control}
                        render={({field})=>(
                        <FormItem>
                            {/* <FormLabel className='text-label-n text-n-900 font-medium'>{item.displayedName}</FormLabel> */}
                            <FormControl>
                                <Input className='focus-visible:ring-n-40 focus-visible:ring-offset-n-40' placeholder={item.displayedName} type={item.type}  {...field} 
                                    onChange={(e) => {
                                        field.onChange(e);
                                        if (item.name === 'password') {
                                            evaluatePasswordStrength(e.target.value);
                                        }
                                    }}
                                    /> 
                            </FormControl>
                            {item.name === 'password' && <FormDescription className={
                                  !passwordState ? "hidden" :
                                  passwordState === "Weak" ? "text-orange-500" :
                                  passwordState === "Very Weak" ? "text-red-500" :
                                  passwordState === "Moderate" ? "text-yellow-500" :
                                  passwordState === "Strong" ? "text-green-500" :
                                  "text-blue-500"
                                }>
                                    {passwordState}
                                </FormDescription>}
                            <FormMessage />
                        </FormItem>  
                        )}
                        >
                    </FormField>
                ))
            }

            

                <FormField
                    name="dateOfBirth"
                    control={form.control}
                    render={({field})=>(
                    <FormItem>
                        <Popover>
                            <PopoverTrigger asChild >
                                <Button
                                variant={"outline"}
                                className={cn("justify-start gap-1 text-left font-normal w-full ", !date && "text-muted-foreground")}
                                >
                                <CalenderIconSVG color={iconColor}/>
                                {date ? format(date, "PPP") : <span>Pick a date</span>}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent align="start" className=" w-full p-0">
                                <Calendar
                                mode="single"
                                captionLayout="dropdown-buttons"
                                selected={date}
                                onSelect={(date)=>{
                                    setDate(date);
                                    field.onChange(date);
                                    setIconColor("#242426")
                                }}
                                fromYear={1960}
                                toYear={2024}
                                />
                            </PopoverContent>
                            </Popover>
                          <FormMessage />
                      </FormItem>  
                      )}
                      />

            <CustomSelect 
            placeholder='Please select your gender.' 
            array={["Male","Female"]} 
            name='gender' 
            control={form.control}/>
            <CustomSelect 
            placeholder='Please select your blood type.' 
            array={["Unknown","A+","A-", "B+","B-","AB+","AB-","O+","O-"]} 
            name='bloodType' 
            control={form.control}/>
            

            
            <FormField
                    name="phoneNumber"
                    control={form.control}
                    render={({field})=>(
                    <FormItem>
                            <PhoneInput {...field}
                            international
                            defaultCountry='MA'
                            placeholder='Enter a phone number'/>
                          <FormMessage />
                      </FormItem>  
                      )}
                      />
                
            


            {/* TODO: add User phone number input */}
         


           <Button className='bg-c-red-500 hover:bg-c-red-600 duration-200' type="submit" disabled={form.formState.isSubmitting}>
                Sign Up
            </Button>


            <CustomSeperator/>

            <LoginWithGoogleButton/>
        </form>
    </Form>
  )
}



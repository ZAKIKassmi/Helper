"use client";
import CustomSelect from '../custom-select';
import { PhoneInput } from '../ui/phone-number';
import CustomCalendar from '../custom-calendar';
import PasswordInput from '../password-input';
import CustomUpload from '../custom-upload';
import DropDownSelector from '../drop-down-selector';
import { Input } from '../ui/input';
import { 
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '../ui/form';

type Props={
  form:any;
  isVisible?: boolean;
}

export default function UserSignUpInputs({form, isVisible=true}: Props) {
  return (
    <>
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

            <FormField 
                    name="email"
                    control={form.control}
                    render={({field})=>(
                    <FormItem>
                        <FormControl>
                            <Input className='focus-visible:ring-n-40 focus-visible:ring-offset-n-40' placeholder="Email" type="email"  {...field}   
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>  
                    )}
                    >
            </FormField>

            <FormField 
                    name="address"
                    control={form.control}
                    render={({field})=>(
                    <FormItem>
                        <FormControl>
                            <Input className='focus-visible:ring-n-40 focus-visible:ring-offset-n-40' placeholder="Address" type="text"  {...field}   
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>  
                    )}
                    >
                </FormField>
                <div className='flex justify-between gap-4 csz:gap-2 flex-wrap'>

                    <FormField 
                        name="province"
                        control={form.control}
                        render={({field})=>(
                        <FormItem className='flex-1 min-w-40'>
                            <FormControl>
                                <Input className='focus-visible:ring-n-40 focus-visible:ring-offset-n-40' placeholder="Province or state" type="text"  {...field}   
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>  
                        )}
                        >
                    </FormField>
                    <FormField 
                        name="zip"
                        control={form.control}
                        render={({field})=>(
                        <FormItem  className='flex-1 min-w-40'>
                            <FormControl>
                                <Input className='focus-visible:ring-n-40 focus-visible:ring-offset-n-40' placeholder="Postal code" type="text"  {...field}   
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>  
                        )}
                        >
                    </FormField>
                </div>

            
            {
                isVisible && (
                    <>
                    <PasswordInput form={form} name="password"/>
                    <PasswordInput form={form} name='confirmPassword'/>
                    <CustomCalendar name='dateOfBirth' form={form} placeholder='Your birthday'/>
                    </>
                )
            }

            

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
            <DropDownSelector isDescriptionVisible={false} type='country' form={form}/>

            {
                isVisible && 
            <CustomUpload name='picture' form={form} placeholder='Upload image'/>
            }

    
    </>
  )
}
'use client';
import { useState } from 'react'
import zxcvbn from 'zxcvbn';
import { 
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from './ui/form';
import { Input } from './ui/input';

type Props = {
  form: any;
  name: 'password' | 'confirmPassword'
}

type PasswordStateNames = 'Very Weak' | 'Weak' | 'Moderate' | 'Strong' | 'Very Strong' | "";

export default function PasswordInput({form, name}: Props) {
  const [passwordState, setPasswordState] = useState<PasswordStateNames>("");  
  

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

  return (
   <FormField 
        name={name}
        control={form.control}
        render={({field})=>(
        <FormItem>
            <FormControl>
                <Input className='focus-visible:ring-n-40 focus-visible:ring-offset-n-40' placeholder={name === "password" ? "Password" : "Confirm Password"} type="password"  {...field} 
                    onChange={(e) => {
                        field.onChange(e);
                        evaluatePasswordStrength(e.target.value);
                    }}
                    /> 
            </FormControl>
            {
              name === "password" &&
              <FormDescription className={
                !passwordState ? "hidden" :
                passwordState === "Weak" ? "text-orange-500" :
                passwordState === "Very Weak" ? "animate-top-bottom text-red-500" :
                passwordState === "Moderate" ? "text-yellow-500" :
                passwordState === "Strong" ? "text-green-500" :
                "text-blue-500"
              }>
                  {passwordState}
              </FormDescription>
            }
            <FormMessage />
        </FormItem>  
        )}
        >
    </FormField>
  )
}
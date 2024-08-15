'use client';
import { createUser } from "@/actions/actions";
import { TUserSchema, userSchema } from "@/lib/types";
import { useFormState, useFormStatus } from "react-dom";
import {useForm} from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";


export function FromAction() {
    const [state, formAction] = useFormState(createUser, null);

    const {
        register,//registre each input "it's like onChange but much better because we don't re-render with each click" so react-form-hook can keep the track of it.  
        handleSubmit,
        formState: {errors, isSubmitting},
        reset,
        setError
    }  = useForm<TUserSchema>({
        resolver: zodResolver(userSchema),
        defaultValues: {
            firstName: '',
            lastName: '',
            email:'',
            password: '',
        }
    });
    
    async function onSubmit(data: TUserSchema){

        // userSchema.parse(data);

        // const formData = new FormData();
        // formData.append('first_name',data.firstName);
        // formData.append('last_name',data.lastName);
        // formData.append('email',data.email);
        // formData.append('password',data.password);
        // formAction(formData);
        // reset();
        
    }
    
    return (
        <form 
        onSubmit={handleSubmit(onSubmit)}  
        // action={formAction}
        className='absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] bg-red-50' 
        noValidate
        >

            
            <label htmlFor="first_name">First name</label> <br />
            <input 
            {
                //what ever returned here, we immediatly spread that in the field.
                ...register('firstName')
            } 
            className="border border-black p-2 mb-2 w-[500px]" type="text" id="first_name" name="first_name" placeholder="First name"/><br />


            <label htmlFor="last_name">Last name</label> <br />
            <input {...register('lastName')} className="border border-black p-2 mb-2 w-[500px]" type="text" id="last_name" name="last_name" placeholder="Last name"/><br />
      
            
            <label htmlFor="email">Email</label> <br />
            <input {...register('email')} className="border border-black p-2 mb-2 w-[500px]" type="email" id="email" name="email" placeholder="Email"/><br />
            {/* <p aria-live="polite" className="not-sr-only text-red-500 max-w-[500px]">
                {state?.errors?.email}
            </p> */}

            {
                errors.email 
                && (
                    <p className="text-red-500">
                        {errors.email.message}
                    </p>
                )
            }
            <br />
            <label htmlFor="password">Password</label> <br />
            <input {...register('password')}  className="border border-black p-2 mb-2 w-[500px]" type="password" name="password" id="password" placeholder="Password"/><br />
            {/* <p aria-live="polite" className="not-sr-only text-red-500 max-w-[500px]">
                {state?.errors?.password}
            </p> */}

            {
                errors.password 
                && (
                    <p className="text-red-500">
                        {errors.password.message}
                    </p>
                )
            }
            <br />
            <br />
            <label htmlFor="confirm_password">Confirm Password</label> <br />
            <input {...register('confirmPassword')} className="border border-black p-2 mb-2 w-[500px]" type="password" name="confirm_password" id="confirm_password" placeholder="Confirm Password"/><br />
            {/* <p aria-live="polite" className="not-sr-only text-red-500 max-w-[500px]">
                {state?.errors?.confirmPassword}
            </p> */}
            {
                errors.confirmPassword
                && (
                    <p className="text-red-500">
                        {errors.confirmPassword.message}
                    </p>
                )
            }
            <br />
            <SubmitButton/>
            
        </form>
)
}



function SubmitButton() {
    const { pending } = useFormStatus()
  
    return (
      <button type="submit" className="bg-black text-white p-2" disabled={pending}>
        {pending ? 'Loading...' : 'sign up'}
      </button>
    )
}


import React from 'react'
import { Button } from '../ui/button';
import { lucia, validateRequest } from '@/lib/auth';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import DashboardIcons from '../icons/dashboard-icons';



export default async function LogOutForm() {

    // await new Promise((resolve) => setTimeout(resolve, 3000));
    
    async function logout(){
        "use server";
        const {session} = await validateRequest();
        if(!session){
            return {
                message: 'Unauthorized',
            }
        }

        await lucia.invalidateSession(session.id);
        const sessionCookie = lucia.createBlankSessionCookie();
        cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
        return redirect('/login');
    }
    
    return (
        <form action={logout}>
            <Button className='bg-white hover:bg-white text-n-90 stroke-n-90 flex gap-2 px-11 items-center hover:text-c-red-500 hover:stroke-c-red-500' type='submit'>
                <DashboardIcons type='logout'/>
                    Log out   
            </Button>
        </form>    
)
}
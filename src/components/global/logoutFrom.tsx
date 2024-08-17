

import React from 'react'
import { Button } from '../ui/button';
import { lucia, validateRequest } from '@/lib/auth';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';



export default function LogOutForm() {
    
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
            <Button>
                Log out
            </Button>
        </form>    
)
}
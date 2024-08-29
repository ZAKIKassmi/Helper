import LogOutForm from "@/components/global/logoutFrom";
import Header from "@/components/header";
import AnimatedHeroSection from "@/components/home/hero-section-animated";
import SecondSection from "@/components/home/second-section";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { db } from "@/drizzle/db";
import { userTable } from "@/drizzle/schema";
import { validateRequest } from "@/lib/auth";
import { eq } from "drizzle-orm";
import Image from "next/image";
import { redirect } from "next/navigation";





export default async function Home() {

  // async function getUser(){
  //     "use server";
  //     const {user} = await validateRequest();
  //     if(!user){
  //       return redirect('/login');
  //     }

  //     const userObject = await db.select().from(userTable).where(eq(userTable.id, user.id));
  //     return userObject;
  // }

  // const user = await getUser();
  
  return (
    <>
        <Header isLoggedIn={false}/>
        <AnimatedHeroSection/>
        <SecondSection/>

        
    </>
  );
}

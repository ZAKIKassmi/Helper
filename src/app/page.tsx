import LogOutForm from "@/components/global/logoutFrom";
import Header from "@/components/header";
import AnimatedHeroSection from "@/components/home/hero-section-animated";
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

        <section className="p-16 bg-c-red-100 text-[#75222D] pl-[110px] pr-[110px] pt-[140px] pb-[140px] flex flex-col gap-7">
          <h1 className=" text-h6-m csz:text-h4-m sm:text-h3-m md:text-h2-m lg:text-h1-d min-w-full font-semibold">
           Why You Should Become a Frequent Donor?
          </h1>
          <p className="max-w-[70ch]">
          Blood has a limited shelf life. For instance, red blood cells last 42 days, and platelets only 5 days. Therefore, regular donations are essential to maintain an adequate supply for hospitals and emergency services. Moreover, Having a steady supply of donated blood ensures that there are reserves available in case of natural disasters, accidents, or other emergencies where a sudden influx of blood is needed.
          </p>
        </section>
    </>
  );
}

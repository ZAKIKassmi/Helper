import LogOutForm from "@/components/global/logoutFrom";
import Header from "@/components/header";
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
        <section className="w-full items-center pt-28 h-[110vh] overflow-hidden relative ">
          <div className="text-white w-full text-center text-5xl flex flex-col">
            <div className="min-h-fit overflow-hidden animate-float">
              <h1 className="text-h6-m md:text-h1-m lg:text-display-small font-bold text-n-900 leading-[120%] transform translate-y-full opacity-0 animate-translate-y-fade-in-then-float ">
                Be a frequent donor,<br/> and save the lives of those around you
              </h1>
            </div>
            <div className="min-h-fit animate-fast-float">
              <h6 className="text-p-s md:text-h6-m lg:text-h6-d text-n-90 animate-translate-y-fade-in-fast-then-float "> 
              Sign up and join our community of blood <br />donors and make a difference.
              </h6>
            </div>

            <div className="animate-float absolute right-[-7.5%] top-52 ">
              <Image className="" src='/images/desktop-hand.svg' width={1392} height={500} alt="Donors hand"/>
            </div>
          </div>
        </section>

        <section className="p-16">
          Hello word
        </section>
    </>
  );
}

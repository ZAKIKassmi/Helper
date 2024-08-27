import LogOutForm from "@/components/global/logoutFrom";
import Header from "@/components/header";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { db } from "@/drizzle/db";
import { userTable } from "@/drizzle/schema";
import { validateRequest } from "@/lib/auth";
import { eq } from "drizzle-orm";
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
        <div className="w-full h-screen  pt-16">
          <div className="text-white w-full text-center bg-black text-5xl">
            <p className="text-display-small font-bold">
              Be a frequent donor,<br/> and save the lives of those around you
            </p>

          </div>
        </div>
    </>
  );
}

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
    <div>
        <Header isLoggedIn={false}/>
      <div>
        {/* Hello {(user.length > 0) && ((user[0].firstName && user[0].lastName )|| user[0].username)} */}
      </div>
      {/* <LogOutForm/> */}
    </div>
  );
}

import LogOutForm from "@/components/global/logoutFrom";
import { db } from "@/drizzle/db";
import { userTable } from "@/drizzle/schema";
import { validateRequest } from "@/lib/auth";
import { TUserSchema } from "@/lib/types";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";




export default async function Home() {

  async function getUser(){
      "use server";
      const {user} = await validateRequest();
      if(!user){
        return redirect('/login');
      }

      const userObject = await db.select().from(userTable).where(eq(userTable.id, user.id));
      return userObject;
  }

  const user = await getUser();
  
  return (
    <div>
      <h1>Hi</h1>
      <div>
        Hello {user[0].firstName} {user[0].lastName} {user[0].username}
      </div>
      <LogOutForm/>
    </div>
  );
}

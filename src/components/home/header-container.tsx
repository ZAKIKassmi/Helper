import { validateBloodBankRequest, validateRequest } from '@/lib/auth'
import Header from '../header';

export default async function HeaderContainer() {
  let isLoggedIn = false;
  let userType = "";
  const {user} = await validateRequest();
  if(user){
    isLoggedIn = true;
    userType = "user";
  }
  else{
    const res = await validateBloodBankRequest();
    if(res.user){
      isLoggedIn = true;
      userType = "bloodBank";
    }
  }

  

  return (
    <>
      <Header isLoggedIn={isLoggedIn} userType={userType}/>
    </>
  )
}
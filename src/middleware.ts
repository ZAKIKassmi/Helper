import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest){

  const authCookie = req.cookies.get("user_auth_session_id");
  if((
    req.nextUrl.pathname.startsWith('/eligibility') 
    || req.nextUrl.pathname.startsWith('/account') 
    || req.nextUrl.pathname.startsWith('/appointment') 
  ) 
    
    && !authCookie?.value){
    return NextResponse.redirect(new URL("/", req.url));
  }
  const bloodBankAuthCookie = req.cookies.get('blood_bank_auth_session_id');
  if((
     req.nextUrl.pathname.startsWith("/registre/facility-details")
  || req.nextUrl.pathname.startsWith("/registre/operational-details")
  || req.nextUrl.pathname.startsWith("/registre/certification-license")
  || req.nextUrl.pathname.startsWith('/blood-levels')
  || req.nextUrl.pathname.startsWith('/create-event')
  || req.nextUrl.pathname.startsWith('/donors')
  || req.nextUrl.pathname.startsWith('/settings')
  || req.nextUrl.pathname.startsWith('/dashboard')
) 
  && !bloodBankAuthCookie?.value)
  {
    return NextResponse.redirect(new URL("/registre/basic-information", req.url));
  }

}


export const config = {
  matcher: ['/appointment','/eligibility','/registre/:path*', "/dashboard", "/donors", "/blood-levels", "/create-event", "/settings", "/account"],
}
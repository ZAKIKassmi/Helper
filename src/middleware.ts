import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest){

  const authCookie = req.cookies.get("user_auth_session_id");
  if((req.nextUrl.pathname.startsWith('/appointment') || req.nextUrl.pathname.startsWith('/eligibility')) && !authCookie?.value){
    return NextResponse.redirect(new URL("/", req.url));
  }
  const bloodBankAuthCookie = req.cookies.get('blood_bank_auth_session_id');
  if((
     req.nextUrl.pathname.startsWith("/registre/facility-details")
  || req.nextUrl.pathname.startsWith("/registre/operational-details")
  || req.nextUrl.pathname.startsWith("/registre/certification-license")) 
  && !bloodBankAuthCookie?.value)
  {
    return NextResponse.redirect(new URL("/registre/basic-information", req.url));
  }

}


export const config = {
  matcher: ['/appointment','/eligibility','/registre/:path*'],
}
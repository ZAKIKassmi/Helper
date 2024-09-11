import Footer from "@/components/footer";
import LogOutForm from "@/components/user-forms/logoutFrom";
import Header from "@/components/header";
import AnimatedHeroSection from "@/components/home/hero-section-animated";
import HowWeWork from "@/components/home/how-we-work";
import SecondSection from "@/components/home/second-section";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { db } from "@/drizzle/db";
import { userTable } from "@/drizzle/schema";
import { validateRequest } from "@/lib/auth";
import { eq } from "drizzle-orm";
import Image from "next/image";
import { redirect } from "next/navigation";
import { getUser } from "../../general-actions/get-user";





export default function Home() {
  

  return (
    <>
        <Header/>
        <AnimatedHeroSection/>
        <SecondSection/>
        <HowWeWork/>
        <Footer/>      
    </>
  );
}

import Footer from "@/components/footer";
import Header from "@/components/header";
import HeaderContainer from "@/components/home/header-container";
import AnimatedHeroSection from "@/components/home/hero-section-animated";
import HowWeWork from "@/components/home/how-we-work";
import SecondSection from "@/components/home/second-section";
import { Suspense } from "react";






export default function Home() {
  

  return (
    <>  
        <Suspense fallback={<p>Loading...</p>}>
          <HeaderContainer/>
        </Suspense>
        <AnimatedHeroSection/>
        <SecondSection/>
        <HowWeWork/>
        <Footer/>      
    </>
  );
}

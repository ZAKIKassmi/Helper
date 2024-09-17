import Footer from "@/components/footer";
import Header from "@/components/header";
import AnimatedHeroSection from "@/components/home/hero-section-animated";
import HowWeWork from "@/components/home/how-we-work";
import SecondSection from "@/components/home/second-section";






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

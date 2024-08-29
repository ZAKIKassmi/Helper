import Image from "next/image";

export default function AnimatedHeroSection() {
  return (
    <section className="items-center pt-28 h-[65vh] csz:h-[80vh] sm:h-[90vh] md:h-[100vh] lg:h-[110vh] 3xl:h-[700px] overflow-hidden relative">
          <div className="text-white w-full text-center text-5xl flex flex-col">
            <div className="min-h-fit overflow-hidden animate-float">
              <h1 className="text-h6-m max-csxxs:text-p-n  csz:text-h4-m sm:text-h3-m  md:text-h1-m lg:text-display-small font-bold text-n-900 leading-[120%] transform translate-y-full opacity-0 animate-translate-y-fade-in-then-float ">
                Be a frequent donor,<br/> and save the lives of those around you
              </h1>
            </div>
            <div className="min-h-fit animate-fast-float">
              <h6 className="text-p-n csz:text-h6-m sm:text-h5-m md:text-h4-m text-n-90 animate-translate-y-fade-in-fast-then-float "> 
              Sign up and join our community of blood <br />donors and make a difference.
              </h6>
            </div>
 
            <div className="animate-float absolute right-[-120px] csz:right-[-150px] md:right-[-200px]  lg:right-[-250px] max-csxxs:top-64 top-52 xl:right-[-150px]">
              <Image className="aspect-[1392/500] hidden lg:block" priority={true} src='/images/desktop-hand.svg' width={1392} height={500} alt="Donors hand"/>
              <Image className="aspect-[1392/500] hidden csz:block  lg:hidden" priority={true}   src='/images/tablet-hand.svg' width={1392} height={500} alt="Donors hand"/>
              <Image className="aspect-[1392/500] csz:hidden  lg:hidden" priority={true}   src='/images/phone-hand.svg' width={1392} height={500} alt="Donors hand"/>
            </div>

          {/* <Image
            className="aspect-[1392/500] hidden lg:block"
            priority={true}
            src="/images/desktop-hand.svg"
            alt="Donors hand"
            layout="responsive"
            width={1392}
            height={500}
            sizes="(max-width: 1024px) 100vw, (max-width: 1280px) 50vw, 33vw"
            srcSet="
              /images/phone-hand.svg 320w,
              /images/tablet-hand.svg 768w,
              /images/desktop-hand.svg 1024w"
          /> */}
          </div>
        </section>
  )
}
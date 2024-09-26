import Hand from "../hand";

export default function AnimatedHeroSection() {
  return (
    <section className="items-center pt-28 h-[60vh] csz:h-[65vh] sm:h-[80vh] md:h-[90vh] lg:h-[110vh] 3xl:h-[50.75rem] overflow-hidden relative">
          <div className="text-white w-full text-center text-5xl lg:pr-20 flex flex-col">

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

            <Hand className="animate-float absolute left-1 -right-28 csz:-right-36 csz:left-8  md:left-16 lg:-right-32 lg:left-16 xl:left-40 xl:-right-28 top-52 aspect-auto"/>
           
 
            {/* <div className="animate-float absolute right-[-7.5rem] csz:right-[-9.375rem] md:right-[-12.5rem]  lg:right-[-15.625rem] top-60 csxxs:top-52 xl:right-[-8rem]">
              <Image className="hidden lg:block" priority={true} src='/images/desktop-hand.svg' width={1392} height={500} alt="Donors hand"/>
              <Image className="hidden csz:block  lg:hidden" priority={true}   src='/images/tablet-hand.svg' width={1392} height={500} alt="Donors hand"/>
              <Image className="csz:hidden  lg:hidden" priority={true} src='/images/phone-hand.svg' width={1392} height={500} alt="Donors hand"/>
            </div> */}

          </div>
        </section>
  )
}
import Image from "next/image";
import Balancer from "react-wrap-balancer";
import DashboardIcons from "../icons/dashboard-icons";
import { Button } from "../ui/button";

export default function Event({image}: {image:string}) {
  return (
      <div className="overflow-hidden border-n-50 items-start p-4 ">

        <div className="aspect-[2/1.5] w-full group relative  overflow-hidden rounded-[1.2rem]">
          <Image src={image} fill objectFit="cover" className="rounded-[1.2rem] group-hover:scale-[1.1] duration-200"  alt="event donation image"/>
        </div>

        <div className="md:flex flex-col flex-1 ">


          <p className="text-n-900 text-label-n px-1 mt-4 mb-2 font-semibold min-w-fit">
              Give Blood, Save Lives: Kenitra Blood Donation Drive 
          </p>
            



          <div>
            <div className="flex stroke-[hsl(var(--muted-foreground))] text-muted-foreground gap-1 stroke-[1] text-label-s items-center">
              <DashboardIcons type="home-hospital" width="20" height="20"/>
              <p> 
                Hopital Ibn Sina
              </p>
            </div>

            <div className="flex stroke-[hsl(var(--muted-foreground))] gap-1 stroke-[1] text-muted-foreground text-label-s items-center">
              <DashboardIcons type="clock"  width="20" height="20"/>
              <p>
              September 12, 2024, at 9:00 AM
              </p>

            </div>
          </div>       


         




        </div>






      </div>
  );
}

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu";
import Image from "next/image";
import Link from "next/link";
import CustomButton from "./customButton";
import { aboutLinkDropDownItems } from "@/lib/constants";

export default function Header({ isLoggedIn }: { isLoggedIn: boolean }) {
  return (
    <nav className="flex w-full justify-between pr-4 pl-4 pt-3 pb-3 items-center md:pr-10 md:pl-10 2xl:pr-[120px] 2xl:pl-[120px]">
      <Link href="/">
        <Image
          src='/images/Logo.svg'
          width={73}
          height={38}
          alt="Helper logo"
          style={{ width: 'auto', height: 'auto' }}
          priority={true}
        />
      </Link>

      <NavigationMenu className="text-xs hidden flex-grow md:flex justify-center">
        <NavigationMenuList className="flex items-center space-x-4">
          <NavigationMenuItem>
            <Link href='/' legacyBehavior passHref>
              <NavigationMenuLink>
                <CustomButton type="link" value="Home" />
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <Link href='/donations' legacyBehavior passHref>
              <NavigationMenuLink>
                <CustomButton type="link" value="Donate" />
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>

          <NavigationMenuItem>
            
              <NavigationMenuTrigger className="p-1 pl-1.5 pr-1.5 bg-white text-n-90 text-xs leading-[110%] hover:bg-[#EFEFEF] hover:text-n-90 relative">
                About us
              </NavigationMenuTrigger>
              <NavigationMenuContent className="">

                <ul className="flex flex-col items-center justify-center bg-white shadow-lg rounded-md">
                  {
                    aboutLinkDropDownItems.map((item: { name: string, location: string }) => (
                      <li key={item.name} className="w-[200px] text-center">
                        <Link className="p-3 block w-full text-n-90 hover:bg-[#EFEFEF]" href={item.location}>
                          {item.name}
                        </Link>
                      </li>
                    ))
                  }
                </ul>
              </NavigationMenuContent>

          </NavigationMenuItem>

          <NavigationMenuItem>
            <Link href='/contact' passHref legacyBehavior>
              <NavigationMenuLink>
                <CustomButton type="link" value="Contact us" />
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>

      <div className="text-xs items-center hidden md:flex gap-1">
        <Link href='/login' className='p-3 pl-3 pr-3 bg-white rounded transition duration-150 ease-in-out text-n-90 text-xs leading-[110%] hover:bg-[#EFEFEF]'>
          Log in
        </Link>
        <Link href="/signup" className='p-3 pl-3 pr-3 bg-c-red-500 rounded text-white transition duration-150 ease-in-out text-xs leading-[110%] hover:bg-c-red-700'>
          Sign up
        </Link>
      </div>
      
      

    </nav>
  )
}

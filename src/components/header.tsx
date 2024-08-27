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
import { aboutLinkDropDownItems, navbarLinks } from "@/lib/constants";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";






export default function Header({ isLoggedIn }: { isLoggedIn: boolean }) {
  return (
    <nav className="flex w-full justify-between pr-4 pl-4 pt-3 pb-3 items-center md:pr-10 md:pl-10 2xl:pr-[120px] 2xl:pl-[120px] border-b-n-30 border fixed bg-white">
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
            
              <NavigationMenuTrigger className="p-1 pl-1.5 pr-1.5 bg-white text-n-90 text-base leading-[110%] hover:bg-[#EFEFEF] hover:text-n-90 relative">
                About us
              </NavigationMenuTrigger>
              <NavigationMenuContent className="">

                <ul className="flex flex-col items-center justify-center bg-white shadow-lg rounded-md">
                  {
                    aboutLinkDropDownItems.map((item: { name: string, location: string }) => (
                      <li key={item.name} className="w-[200px] text-center">
                        <Link className="p-3 block w-full text-n-90 text-base hover:bg-[#EFEFEF]" href={item.location}>
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

      {
        isLoggedIn ? (
          
              <Link href="/dashboard" className='p-3 pl-3 pr-3 bg-c-red-500 rounded text-white transition duration-150 ease-in-out text-base leading-[110%] hover:bg-c-red-700'>
            Dashboard
            </Link>
         
        ): (
          <div className="items-center hidden md:flex gap-2">
        <Link href='/login' className='p-3 pl-3 pr-3 bg-white rounded transition duration-150 ease-in-out text-n-90 text-base leading-[110%] hover:bg-[#EFEFEF]'>
          Log in
        </Link>
        <Link href="/signup" className='p-3 pl-3 pr-3 bg-c-red-500 rounded text-white transition duration-150 ease-in-out text-base leading-[110%] hover:bg-c-red-700'>
          Sign up
        </Link>
      </div>
        )
      }

      

      <div className="md:hidden">
        <Sheet>
          <SheetTrigger>
            <Image src='/icons/Hamburger.svg' alt="Hamburger Icon" width={24} height={24} />
          </SheetTrigger>
          <SheetContent className="pt-16 flex flex-col gap-2 justify-between">
            <div>

            
            {navbarLinks.map((link: { name: string, location: string, isDropDown: boolean, description: string }) => (
              <div key={link.name} className="p-4 hover:bg-[#EFEFEF] flex justify-between rounded">
                {link.isDropDown ? (
                  <Sheet>
                    <SheetTrigger className="w-full">
                      <div className="flex justify-between w-full">
                        <div>
                          <SheetTitle className="text-n-700 text-base text-left">{link.name}</SheetTitle>
                          <SheetDescription className="text-n-70 text-sm">
                            {link.description}
                          </SheetDescription>
                        </div>
                        <Image src="/icons/arrow-right.svg" alt="Arrow right icon" height={16} width={16}/>
                      </div>
                    </SheetTrigger>
                    <SheetContent className="pt-16 flex flex-col gap-2">
                      {aboutLinkDropDownItems.map((item)=>(
                        <Link href={item.location} className="p-4 hover:bg-[#EFEFEF] flex flex-col justify-between rounded">
                        <SheetTitle className="text-n-700 text-base">{item.name}</SheetTitle>
                        <SheetDescription className="text-n-70 text-sm">
                          {item.description}
                        </SheetDescription>
                      </Link>
                      ))}
                    </SheetContent>
                  </Sheet>
                ) : (
                  <Link href={link.location} className="flex-1">
                    <SheetTitle className="text-n-700 text-base">{link.name}</SheetTitle>
                    <SheetDescription className="text-n-70 text-sm">
                      {link.description}
                    </SheetDescription>
                  </Link>
                )}


                
              </div>
            ))}
            </div>
            {
              isLoggedIn ? (
                
                    <Link href="/dashboard" className='p-3 text-center pl-3 pr-3 bg-c-red-500 rounded text-white transition duration-150 ease-in-out text-base leading-[110%] hover:bg-c-red-700'>
                  Dashboard
                  </Link>
              
              ): (

                <div className="items-center flex flex-col w-full gap-2 text-center">
              <Link href='/login' className='p-3 pl-3 pr-3 w-full bg-white rounded transition duration-150 ease-in-out text-n-90 text-base leading-[110%] hover:bg-[#EFEFEF]'>
                Log in
              </Link>
              <Link href="/signup" className='p-3 pl-3 pr-3 w-full bg-c-red-500 rounded text-white transition duration-150 ease-in-out text-base leading-[110%] hover:bg-c-red-700'>
                Sign up
              </Link>
            </div>
            )}
          </SheetContent>
        </Sheet>
      </div>

    </nav>
  )
}

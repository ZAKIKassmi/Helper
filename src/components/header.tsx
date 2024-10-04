'use client';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
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
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import Logo from "./icons/logo";
import HumburgerIcon from "./icons/Humburger";
import Arrow from "./icons/arrow";


export default function Header({isLoggedIn, userType}: {isLoggedIn:boolean, userType:string}) {
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollTopRef = useRef(0);
  
  const handleScroll = () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    if (scrollTop > lastScrollTopRef.current) {
      // Downscroll
      setIsVisible(false);
    } else {
      // Upscroll
      setIsVisible(true);
    }
    lastScrollTopRef.current = scrollTop <= 0 ? 0 : scrollTop; // For Mobile or negative scrolling
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);


  return (
    <nav
      className={cn(
        "flex w-full max-w-[95rem] justify-between pr-4 pl-4 pt-3 pb-3 items-center lg:px-20 2xl:pr-[7.5rem] 2xl:pl-[7.5rem]   border-b-n-30 border-b fixed bg-white z-50 transition-transform duration-300",
        {
          "-translate-y-full": !isVisible,
          "translate-y-0": isVisible,
        }
      )}
    >
      <Link href="/">
        <Logo/>
      </Link>
      <NavigationMenu className="text-xs hidden w-full  md:flex justify-center">
        <NavigationMenuList className="flex justify-center space-x-4">
          <NavigationMenuItem>
            <Link href='/' legacyBehavior passHref>
              <NavigationMenuLink>
                <CustomButton type="link" value="Home" />
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <Link href='/donation' legacyBehavior passHref>
              <NavigationMenuLink>
                <CustomButton type="link" value="Donate" />
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <Link href='/events' legacyBehavior passHref>
              <NavigationMenuLink>
                <CustomButton type="link" value="Events" />
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href='/events' legacyBehavior passHref>
              <NavigationMenuLink>
                <CustomButton type="link" value="Blood Centers" />
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>

          {/* <NavigationMenuItem>
            <NavigationMenuTrigger className="p-1 pl-1.5 pr-1.5 bg-white text-n-90 text-base leading-[110%] hover:bg-[#EFEFEF] hover:text-n-90 relative">
              About us
            </NavigationMenuTrigger>
            <NavigationMenuContent className="">
              <ul className="flex flex-col items-center justify-center bg-white shadow-lg rounded-md">
                {aboutLinkDropDownItems.map((item: { name: string, location: string }) => (
                  <li key={item.name} className="w-[12.5rem] text-center">
                    <Link className="p-3 block w-full text-n-90 text-base text-left hover:bg-[#EFEFEF]" href={item.location}>
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem> */}
        </NavigationMenuList>
      </NavigationMenu>


      {isLoggedIn ? (
        userType === "bloodBank" ? (
          <Link href="/dashboard" className='p-3 pl-3 pr-3 bg-c-red-500 rounded-md hidden md:block text-white transition duration-150 ease-in-out text-base leading-[110%] hover:bg-c-red-700'>
          Dashboard
        </Link> 
        ) : (
          <Link href="/account" className='p-3 pl-3 pr-3 bg-c-red-500 hidden md:block rounded-md text-white transition duration-150 ease-in-out text-base leading-[110%] hover:bg-c-red-700'>
          Account
        </Link> 
        )
      ) : (
        <div className="items-center hidden md:flex gap-2">
          <Link href='/user-type?path=login' className='p-3 pl-3 pr-3 bg-white rounded-md transition duration-150 ease-in-out text-n-90 text-base leading-[110%] hover:bg-[#EFEFEF]'>
            Log in
          </Link>
          <Link href="/user-type?path=signup" className='p-3 pl-3 pr-3 bg-c-red-500 rounded-md text-white transition duration-150 ease-in-out text-base leading-[110%] hover:bg-c-red-700'>
            Sign up
          </Link>
        </div>
      )}

      <div className="md:hidden">
        <Sheet>
          <SheetTrigger>
            <HumburgerIcon width="24" height="24"/>
          </SheetTrigger>
          <SheetContent className="pt-16 flex flex-col gap-2 justify-between">
            <div>
              {navbarLinks.map((link: { name: string, location: string, isDropDown: boolean, description: string }) => (
                <div key={link.name} className="p-4 hover:bg-[#EFEFEF] flex justify-between rounded">
                  {link.isDropDown ? (
                    <Sheet>
                      <SheetTrigger className="w-full">
                        <div className="flex justify-between items-center w-full">
                          <div>
                            <SheetTitle className="text-n-700 text-base text-left">{link.name}</SheetTitle>
                            <SheetDescription className="text-n-70 text-sm text-left">
                              {link.description}
                            </SheetDescription>
                          </div>
                          <Arrow direction="right" width="20" height="20"/>
                        </div>
                      </SheetTrigger>
                      <SheetContent className="pt-16 flex flex-col gap-2">
                        {aboutLinkDropDownItems.map((item) => (
                          <Link key={item.name} href={item.location} className="p-4 hover:bg-[#EFEFEF] flex flex-col justify-between rounded">
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
            {isLoggedIn ? (
              <Link href="/dashboard" className='p-3 text-center pl-3 pr-3 bg-c-red-500 rounded text-white transition duration-150 ease-in-out text-base leading-[110%] hover:bg-c-red-700'>
                Dashboard
              </Link>
            ) : (
              <div className="items-center flex flex-col w-full gap-2 text-center">
                <Link href='/user-type?path=login' className='p-3 pl-3 pr-3 w-full bg-white rounded transition duration-150 ease-in-out text-n-90 text-base leading-[110%] hover:bg-[#EFEFEF]'>
                  Log in
                </Link>
                <Link href='/user-type?path=signup' className='p-3 pl-3 pr-3 w-full bg-c-red-500 rounded text-white transition duration-150 ease-in-out text-base leading-[110%] hover:bg-c-red-700'>
                  Sign up
                </Link>
              </div>
            )}
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
}

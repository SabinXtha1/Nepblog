"use client"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { UserButton, useUser } from "@clerk/nextjs"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"

import { LogIn } from "lucide-react"
import NavbarMb from "./NavbarMb"
import { ThemeToggle } from "@/components/theme-toggle"

const Navbar = () => {
  const { user, isLoaded, isSignedIn } = useUser()
  const [isSidebarOpen, setisSidebarOpen] = useState(false)
  const [isUserLogin, setisUserLogin] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      setisUserLogin(true)
    }
  }, [isLoaded, isSignedIn])

  useEffect(() => {
    const controlNavbar = () => {
      const currentScrollY = window.scrollY

      // Determine scroll direction and update visibility
      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        // Scrolling down & past initial threshold
        setIsVisible(false)
      } else {
        // Scrolling up or at the top
        setIsVisible(true)
      }

      setLastScrollY(currentScrollY)
    }

    // Add scroll event listener
    window.addEventListener("scroll", controlNavbar)

    // Cleanup function
    return () => {
      window.removeEventListener("scroll", controlNavbar)
    }
  }, [lastScrollY])

  const pathname = usePathname()
  const NavLists = [
    {
      name: "Home",
      link: "/",
    },
    {
      name: "About",
      link: "/about",
    },
    {
      name: "Contact",
      link: "/contact",
    },
    {
      name: "Blog",
      link: "/blog",
    },
  ]

  return (
<div>

      <div className="h-12 w-full flex justify-between py-10 items-center">

      </div>
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 h-12 w-full flex justify-between px-4 items-center border-b py-10 bg-background/80 backdrop-blur-sm z-50 transition-transform duration-300",
        isVisible ? "translate-y-0" : "-translate-y-full",
      )}
      >
        <Link href={"/"}>
        <h1 className="text-2xl font-bold">BlogNep</h1>
        </Link>
        <div className="flex items-center gap-4">
          <div className="text-xl font-semibold md:flex gap-4 hidden">
            {NavLists.map((item) => {
              return (
                  <Link key={item.link} href={item.link}>
                  <Button variant="link" className={cn(pathname === item.link ? "underline" : "", "")}>
                    {item.name}
                  </Button>
                </Link>
              )
            })}
            {isUserLogin ? (
              <UserButton />
            ) : (
                <div className="flex items-center gap-4">
                <Link href={"/sign-in"} className="flex items-center gap-2">
                  <LogIn />
                  Sign In
                </Link>
              </div>
            )}
          </div>
          <div className="flex md:hidden">
            <NavbarMb
              open={isSidebarOpen}
              onOpenChange={setisSidebarOpen}
              items={NavLists}
              pathname={pathname}
              isUserLogin={isUserLogin}
              />
          </div>
          <ThemeToggle />
        </div>
    
    </nav>
              </div>
  )
}

export default Navbar

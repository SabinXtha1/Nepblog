"use client"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { UserButton, useUser } from "@clerk/nextjs"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import { ChevronDown, LogIn, PenLine, User } from "lucide-react"
import NavbarMb from "./NavbarMb"
import { ThemeToggle } from "@/components/theme-toggle"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

const Navbar = () => {
  const { user, isLoaded, isSignedIn } = useUser()
  const [isSidebarOpen, setSidebarOpen] = useState(false)
  const [isUserLogin, setIsUserLogin] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const pathname = usePathname()

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      setIsUserLogin(true)
    }
  }, [isLoaded, isSignedIn])

  useEffect(() => {
    const controlNavbar = () => {
      const currentScrollY = window.scrollY
      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        setIsVisible(false)
      } else {
        setIsVisible(true)
      }
      setLastScrollY(currentScrollY)
    }

    window.addEventListener("scroll", controlNavbar)
    return () => {
      window.removeEventListener("scroll", controlNavbar)
    }
  }, [lastScrollY])

  const navItems = [
    { name: "Home", link: "/" },
    { name: "Blog", link: "/allblog" },
    { name: "About", link: "/about" },
    { name: "Contact", link: "/contact" },
  ]

  const blogItems = [
    { name: "My Blogs", link: "/admin/mypost", icon: User },
    { name: "Create Blog", link: "/admin/create", icon: PenLine },
  ]

  const isBlogActive = pathname === "/admin/mypost" || pathname === "/admin/create"

  return (
    <>
      <div className="h-20 w-full" />
      <nav
        className={cn(
          "fixed top-0 left-0 right-0 h-20 w-full flex justify-between px-4 md:px-6 items-center border-b bg-background/90 backdrop-blur-md z-50 transition-transform duration-300",
          isVisible ? "translate-y-0" : "-translate-y-full",
        )}
      >
        <Link href="/" className="flex items-center">
          <h1 className="text-2xl font-bold">BlogNep</h1>
        </Link>

        <div className="flex items-center gap-4">
          <div className="text-base font-medium md:flex gap-2 hidden">
            {navItems.map((item) => (
              <Link key={item.link} href={item.link}>
                <Button
                  variant="ghost"
                  className={cn("rounded-md px-3", pathname === item.link ? "bg-muted font-semibold" : "")}
                >
                  {item.name}
                </Button>
              </Link>
            ))}

            {isUserLogin && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className={cn("rounded-md px-3 gap-1", isBlogActive ? "bg-muted font-semibold" : "")}
                  >
                    My Blog <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  {blogItems.map((item) => (
                    <DropdownMenuItem key={item.link} asChild>
                      <Link href={item.link} className="flex items-center gap-2 cursor-pointer">
                        <item.icon className="h-4 w-4" />
                        <span className={cn(pathname === item.link ? "font-medium" : "")}>{item.name}</span>
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            )}

            {isUserLogin ? (
              <div className="ml-2">
                <UserButton afterSignOutUrl="/" />
              </div>
            ) : (
              <Link href="/sign-in">
                <Button variant="outline" size="sm" className="gap-2">
                  <LogIn className="h-4 w-4" />
                  Sign In
                </Button>
              </Link>
            )}
          </div>

          <div className="flex items-center gap-3">
            <ThemeToggle />
            <div className="md:hidden">
              <NavbarMb
                open={isSidebarOpen}
                onOpenChange={setSidebarOpen}
                items={navItems}
                blogItems={blogItems}
                pathname={pathname}
                isUserLogin={isUserLogin}
              />
            </div>
          </div>
        </div>
      </nav>
    </>
  )
}

export default Navbar

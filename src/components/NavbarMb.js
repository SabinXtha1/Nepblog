"use client"

import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"
import { ChevronDown, LogIn, MenuIcon } from "lucide-react"
import Link from "next/link"
import { UserButton } from "@clerk/nextjs"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { useState } from "react"

const NavbarMb = ({ open, onOpenChange, items, blogItems, pathname, isUserLogin }) => {
  const [isBlogOpen, setIsBlogOpen] = useState(false)
  const isBlogActive = pathname === "/admin/mypost" || pathname === "/admin/create"

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="h-9 w-9">
          <MenuIcon className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[280px] p-0">
        <SheetHeader className="p-4 border-b">
          <div className="flex items-center gap-2">
            {isUserLogin && <UserButton />}
            <SheetTitle>Menu</SheetTitle>
          </div>
        </SheetHeader>
        <ScrollArea className="h-[calc(100vh-65px)]">
          <div className="flex flex-col py-2">
            {items.map((item) => (
              <Link key={item.link} href={item.link} onClick={() => onOpenChange(false)}>
                <Button
                  variant="ghost"
                  className={cn(
                    "w-full justify-start rounded-none h-12 px-4 font-medium",
                    pathname === item.link ? "bg-muted" : "",
                  )}
                >
                  {item.name}
                </Button>
              </Link>
            ))}

            <Separator className="my-2" />

            {isUserLogin ? (
              <div className="flex flex-col">
                <Collapsible open={isBlogOpen} onOpenChange={setIsBlogOpen} className="w-full">
                  <CollapsibleTrigger asChild>
                    <Button
                      variant="ghost"
                      className={cn(
                        "w-full justify-between rounded-none h-12 px-4 font-medium",
                        isBlogActive ? "bg-muted" : "",
                      )}
                    >
                      My Blog
                      <ChevronDown
                        className={cn("h-4 w-4 transition-transform duration-200", isBlogOpen ? "rotate-180" : "")}
                      />
                    </Button>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="bg-muted/50">
                    {blogItems.map((item) => (
                      <Link key={item.link} href={item.link} onClick={() => onOpenChange(false)}>
                        <Button
                          variant="ghost"
                          className={cn(
                            "w-full justify-start rounded-none h-12 pl-8 pr-4 font-medium",
                            pathname === item.link ? "bg-muted" : "",
                          )}
                        >
                          <item.icon className="h-4 w-4 mr-2" />
                          {item.name}
                        </Button>
                      </Link>
                    ))}
                  </CollapsibleContent>
                </Collapsible>
              </div>
            ) : (
              <Link href="/sign-in" onClick={() => onOpenChange(false)} className="px-4 py-3">
                <Button className="w-full gap-2">
                  <LogIn className="h-4 w-4" />
                  Sign In
                </Button>
              </Link>
            )}
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  )
}

export default NavbarMb

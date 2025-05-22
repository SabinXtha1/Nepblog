import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { ScrollArea } from '@radix-ui/react-scroll-area';
import { cn } from "@/lib/utils"
import { LogIn, MenuIcon, User } from "lucide-react"
import Link from "next/link"
import { UserButton } from "@clerk/nextjs";
import { Button } from "./ui/button";

const NavbarMb = ({open,onOpenChange,items,pathname,isUserLogin}) => {
  return (
  <Sheet open={open} onOpenChange={onOpenChange}  >
  <SheetTrigger >
    <MenuIcon/>
  </SheetTrigger>
  <SheetContent side="left">
    <SheetHeader className={'border-b'}>
      <div className="flex items-center gap-2">
<UserButton/>
      <SheetTitle >
        
       Menu</SheetTitle>
      </div>
      
    </SheetHeader>
     <ScrollArea className='flex flex-col overflow-y-auto h-full pb-2'>
            {
                items.map((item)=>{
                  return (
                    <Link onClick={()=>onOpenChange(false)} key={item.link} href={item.link} className={cn('w-full text-left p-4 hover:border  flex items-center text-base font-medium',pathname==item.link?'bg-black text-white':"")} >
                        {item.name}
                    </Link>
                  )  
                })
            }
            <div className='border-t'>
              
                {
            isUserLogin? <div className="flex flex-col">
              <Link  href={'/admin/mypost'} className="border-b">
                           <Button variant="link" className={cn(pathname === '/admin/mypost' ? "underline" : "", 'w-full text-left p-4 hover:border  flex items-center text-base font-medium')}>
                                MyBlogs
                              </Button>
                             </Link>
                                <Link href={'/admin/create'} className="border-b">
                               <Button variant="link" className={cn(pathname === '/admin/create' ? "underline" : "", "w-full text-left p-4 hover:border  flex items-center text-base font-medium")} >
                               Create Blogs
                              </Button>
                                </Link>
            </div>
              :
              
              <div className='gap-4 w-full text-left p-4 hover:bg-black hover:text-white flex items-center text-base font-medium'> <Link href={'/sign-in'} className='flex items-center gap-2' >
                <LogIn/>
                    Sign In
                </Link>
                 </div>
        }
            </div>
        </ScrollArea>
  </SheetContent>
</Sheet>

  )
}

export default NavbarMb
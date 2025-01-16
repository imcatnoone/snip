import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Image, SquareDashed, Grip, HelpCircle } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const navItems = [
  { href: "/backgrounds", label: "Backgrounds", icon: Image },
  { href: "/border", label: "Border", icon: SquareDashed },
  { href: "/grain", label: "Grain", icon: Grip },
]

export function Sidebar({ className }: React.HTMLAttributes<HTMLDivElement>) {
  const pathname = usePathname()
  
  return (
    <div className={cn(
      "sticky top-0 h-screen flex flex-col", 
      className
    )}>
      <div className="flex-grow">
        <div className="space-y-3 py-3">
          <div className="px-2 py-1">
            <div className="space-y-1">
              {navItems.map(({ href, label, icon: Icon }) => (
                <Link key={href} href={href}>
                  <Button
                    variant="ghost"
                    className={cn(
                      "w-full justify-start text-primary hover:bg-accent hover:text-accent-foreground text-sm",
                      pathname === href && "bg-accent"
                    )}
                  >
                    <Icon className="mr-2 h-4 w-4" />
                    {label}
                  </Button>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="mt-auto pb-4 px-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="ghost" 
              className="w-full justify-start text-primary hover:bg-accent hover:text-accent-foreground text-sm"
            >
              <HelpCircle className="h-4 w-4 mr-2" />
              More options
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent 
            align="start"
            className="w-[200px] pl-2"
          >
            <DropdownMenuLabel>Help</DropdownMenuLabel>
            <DropdownMenuItem className="flex justify-between">
              <span>Billing</span>
              <span className="text-muted-foreground text-xs">Coming Soon</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="flex justify-between">
              <span>Changelog</span>
              <span className="text-muted-foreground text-xs">Coming Soon</span>
            </DropdownMenuItem>
            <DropdownMenuItem>Contact support</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Log out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}

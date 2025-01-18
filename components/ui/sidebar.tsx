import { useState } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Image, SquareDashed, Grip, HelpCircle, ImagePlus, Trash2 } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface NavItem {
  id: string;
  label: string;
  icon: React.ComponentType<any>;
  content: React.ReactNode;
}

const navItems: NavItem[] = [
  { id: "backgrounds", label: "Backgrounds", icon: Image, content: null },
  { id: "border", label: "Border", icon: SquareDashed, content: null },
  { id: "grain", label: "Grain", icon: Grip, content: null },
  {
    id: "delete",
    icon: Trash2,
    label: "Delete",
    content: null
  }
]

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  onDelete?: () => void;
}

export function Sidebar({ className, onDelete }: SidebarProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [activeSection, setActiveSection] = useState<string | null>(null)

  const handleSectionClick = (id: string) => {
    if (id === "delete" && onDelete) {
      onDelete();
      return;
    }
    
    if (id === activeSection) {
      // If clicking the active section, toggle the expansion
      setIsExpanded(!isExpanded);
    } else {
      // If clicking a new section, activate it and expand
      setActiveSection(id);
      setIsExpanded(true);
    }
  }
  
  const activeItem = navItems.find(item => item.id === activeSection)
  
  return (
    <div className={cn(
      "sticky top-0 h-screen flex flex-col transition-all duration-300",
      isExpanded ? "w-64" : "w-16",
      className
    )}>
      {/* Active Section Label */}
      {isExpanded && activeItem && (
        <div className="absolute top-5 left-16 px-4">
          <h2 className="text-sm font-medium">{activeItem.label}</h2>
        </div>
      )}
      
      <div className="flex-grow border-r">
        <div className="space-y-3 py-3">
          <div className={cn(
            "transition-all duration-300",
            isExpanded ? "px-4" : "px-3"
          )}>
            <div className="space-y-1 flex flex-col">
              {navItems.map(({ id, label, icon: Icon }) => (
                <Button
                  key={id}
                  variant="ghost"
                  onClick={() => handleSectionClick(id)}
                  className={cn(
                    "transition-all duration-300 p-0 h-10 w-10",
                    "justify-center px-3",
                    activeSection === id && "bg-accent",
                  )}
                >
                  <Icon className="h-4 w-4" />
                </Button>
              ))}
            </div>
          </div>
          {isExpanded && activeItem && (
            <div className="mt-16">
              {activeItem.content}
            </div>
          )}
        </div>
      </div>
      <div className={cn(
        "mt-auto pb-4 space-y-2 transition-all duration-300",
        isExpanded ? "px-4" : "px-3"
      )}>
        <Button 
          variant="outline"
          className={cn(
            "w-full transition-all duration-300",
            isExpanded ? "justify-start" : "justify-center"
          )}
        >
          <ImagePlus className={cn(
            "h-4 w-4",
            isExpanded ? "mr-2" : "mr-0"
          )} />
          {isExpanded && "Save Image"}
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="ghost" 
              className={cn(
                "w-full transition-all duration-300",
                isExpanded ? "justify-start" : "justify-center"
              )}
            >
              <HelpCircle className={cn(
                "h-4 w-4",
                isExpanded ? "mr-2" : "mr-0"
              )} />
              {isExpanded && "More options"}
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

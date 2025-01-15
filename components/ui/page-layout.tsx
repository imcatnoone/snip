"use client"

import { Sidebar } from "@/components/ui/sidebar"
import { cn } from "@/lib/utils"

interface PageLayoutProps {
  children: React.ReactNode
  heading: string
  text?: string
  className?: string
}

export function PageLayout({ children, heading, text, className }: PageLayoutProps) {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar className="w-52 border-r" />
      <div className={cn("flex-1 p-8", className)}>
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium">{heading}</h3>
            {text && <p className="text-sm text-muted-foreground">{text}</p>}
          </div>
          {children}
        </div>
      </div>
    </div>
  )
} 
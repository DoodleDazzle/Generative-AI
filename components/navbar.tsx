"use client"

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Brain } from 'lucide-react'
import { ModeToggle } from '@/components/mode-toggle'

export function Navbar() {
  return (
    <nav className="fixed top-0 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <Brain className="h-6 w-6 text-primary" />
          <span className="font-bold">CodeCollab AI</span>
        </Link>
        
        <div className="flex items-center space-x-4">
          <ModeToggle />
          <Link href="/signin">
            <Button variant="ghost">Sign In</Button>
          </Link>
          <Link href="/signup">
            <Button>Get Started</Button>
          </Link>
        </div>
      </div>
    </nav>
  )
}
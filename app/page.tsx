import { Navbar } from '@/components/navbar'
import { Button } from '@/components/ui/button'
import { Code2, Users, LineChart, Brain } from 'lucide-react'
import Link from 'next/link'

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="flex-1 flex flex-col items-center justify-center space-y-10 px-4 pt-24 pb-16 text-center bg-gradient-to-b from-background to-background/80">
        <div className="max-w-3xl space-y-4">
          <div className="text-gradient text-4xl sm:text-5xl md:text-6xl font-bold">
            Collaborative Coding with AI Intelligence
          </div>
          <p className="text-xl text-muted-foreground">
            Write better code together with real-time collaboration, AI-powered suggestions, and deep analytics insights.
          </p>
        </div>
        
        <div className="flex flex-wrap justify-center gap-4">
          <Link href="/signup">
            <Button size="lg" className="text-lg">
              <Code2 className="mr-2 h-5 w-5" />
              Start Coding
            </Button>
          </Link>
          <Link href="/join">
            <Button size="lg" variant="outline" className="text-lg">
              <Users className="mr-2 h-5 w-5" />
              Join Session
            </Button>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="container py-20 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="p-6 rounded-lg border bg-card">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
            <Users className="h-6 w-6 text-primary" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Real-time Collaboration</h3>
          <p className="text-muted-foreground">
            Code together in real-time with your team. Share, edit, and review code simultaneously.
          </p>
        </div>
        
        <div className="p-6 rounded-lg border bg-card">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
            <Brain className="h-6 w-6 text-primary" />
          </div>
          <h3 className="text-xl font-semibold mb-2">AI Assistance</h3>
          <p className="text-muted-foreground">
            Get intelligent code suggestions, automated code reviews, and smart completions.
          </p>
        </div>
        
        <div className="p-6 rounded-lg border bg-card">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
            <LineChart className="h-6 w-6 text-primary" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Analytics</h3>
          <p className="text-muted-foreground">
            Track performance, measure productivity, and gain insights into your coding patterns.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-6 text-center text-sm text-muted-foreground">
        <p>© 2025 CodeCollab AI. All rights reserved.</p>
      </footer>
    </div>
  )
}

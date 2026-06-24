import { ArrowRight, Feather, LayoutDashboard, Sparkles } from "lucide-react"
import { Link } from "react-router"

import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function App() {
  return (
    <main className="relative min-h-dvh overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,oklch(0.72_0.16_292/0.18),transparent_35%),radial-gradient(circle_at_85%_15%,oklch(0.75_0.13_205/0.15),transparent_30%)]" />

      <nav className="relative mx-auto flex max-w-6xl items-center justify-between px-4 py-5 sm:px-6 sm:py-7 lg:px-8">
        <Link to="/" className="flex items-center gap-3 font-semibold tracking-tight">
          <span className="flex size-10 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-lg shadow-primary/20">
            <Feather className="size-5" />
          </span>
          <span className="text-lg">Storyflow</span>
        </Link>
        <Link
          to="/posts"
          className={cn(buttonVariants({ variant: "ghost", size: "sm" }), "rounded-xl")}
        >
          Dashboard
          <LayoutDashboard />
        </Link>
      </nav>

      <section className="relative mx-auto grid max-w-6xl items-center gap-12 px-4 pb-16 pt-10 sm:px-6 sm:pb-20 sm:pt-16 lg:grid-cols-[1.08fr_.92fr] lg:gap-16 lg:px-8 lg:pb-28 lg:pt-24">
        <div>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border bg-card/70 px-3 py-1.5 text-xs font-medium text-muted-foreground shadow-sm backdrop-blur">
            <Sparkles className="size-3.5 text-violet-500" />
            A quiet place for your loudest ideas
          </div>
          <h1 className="max-w-3xl text-4xl font-semibold leading-[1.06] tracking-[-0.045em] text-balance min-[420px]:text-5xl sm:text-6xl lg:text-7xl">
            Write clearly.
            <span className="block bg-gradient-to-r from-violet-500 to-cyan-500 bg-clip-text text-transparent">
              Publish beautifully.
            </span>
          </h1>
          <p className="mt-7 max-w-xl text-lg leading-8 text-muted-foreground">
            A focused publishing workspace for turning half-formed thoughts into
            stories people want to read.
          </p>
          <div className="mt-8 grid gap-3 min-[420px]:flex min-[420px]:flex-wrap min-[420px]:items-center sm:mt-9">
            <Link
              to="/create-post"
              className={cn(
                buttonVariants({ size: "lg" }),
                "rounded-2xl shadow-xl shadow-primary/15"
              )}
            >
              Start writing
              <ArrowRight />
            </Link>
            <Link
              to="/posts"
              className={cn(buttonVariants({ variant: "outline", size: "lg" }), "rounded-2xl")}
            >
              Explore stories
            </Link>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-lg">
          <div className="absolute -inset-8 rounded-[3rem] bg-gradient-to-br from-violet-500/20 to-cyan-400/10 blur-3xl" />
          <div className="relative rotate-2 rounded-[2rem] border bg-card/85 p-3 shadow-2xl shadow-black/10 backdrop-blur-xl">
            <div className="rounded-[1.4rem] border bg-background p-7 sm:p-9">
              <div className="mb-9 flex items-center gap-2">
                <span className="size-2.5 rounded-full bg-rose-400" />
                <span className="size-2.5 rounded-full bg-amber-400" />
                <span className="size-2.5 rounded-full bg-emerald-400" />
              </div>
              <p className="text-xs font-semibold tracking-[0.16em] text-violet-500 uppercase">
                Draft · 4 min read
              </p>
              <h2 className="mt-4 text-3xl font-semibold leading-tight tracking-[-0.03em]">
                The small rituals that make creative work possible
              </h2>
              <div className="mt-7 space-y-3">
                <div className="h-2.5 w-full rounded-full bg-muted" />
                <div className="h-2.5 w-[92%] rounded-full bg-muted" />
                <div className="h-2.5 w-[72%] rounded-full bg-muted" />
              </div>
              <div className="mt-9 flex items-center gap-3 border-t pt-6">
                <div className="flex size-10 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-400 text-sm font-semibold text-white">
                  AM
                </div>
                <div>
                  <p className="text-sm font-medium">Alex Morgan</p>
                  <p className="text-xs text-muted-foreground">Edited just now</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

export default App

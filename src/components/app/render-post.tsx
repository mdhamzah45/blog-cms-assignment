import { ArrowLeft, Clock3, Edit3, Feather } from "lucide-react"
import { Link, useParams } from "react-router"

import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { usePosts } from "@/lib/posts"

function RenderPost() {
  const { slug } = useParams()
  const { posts } = usePosts()
  const post = posts.find((item) => item.slug === slug)

  if (!post) {
    return (
      <main className="flex min-h-svh flex-col items-center justify-center px-6 text-center">
        <p className="text-sm font-medium text-violet-500">404</p>
        <h1 className="mt-3 text-3xl font-semibold">Story not found</h1>
        <Link to="/posts" className={cn(buttonVariants(), "mt-7 rounded-xl")}>
          Back to dashboard
        </Link>
      </main>
    )
  }

  const paragraphs = post.content.split(/\n\s*\n/).filter(Boolean)
  const wordCount = post.content.trim().split(/\s+/).length
  const initials = post.author
    .split(" ")
    .map((name) => name[0])
    .join("")

  return (
    <main className="min-h-dvh">
      <header className="border-b bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-3 px-4 py-4 sm:px-5 sm:py-5">
          <Link to="/" className="flex items-center gap-3 font-semibold">
            <span className="flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
              <Feather className="size-4" />
            </span>
            <span className="hidden min-[360px]:inline">Storyflow</span>
          </Link>
          <div className="flex items-center gap-2">
            <Link
              to="/posts"
              className="flex items-center gap-2 px-1 text-sm font-medium text-muted-foreground transition hover:text-foreground sm:px-3"
            >
              <ArrowLeft className="size-4" />
              <span className="hidden sm:inline">All stories</span>
            </Link>
            <Link
              to={`/edit-post/${post.id}`}
              className={cn(buttonVariants({ variant: "outline", size: "sm" }), "rounded-xl")}
            >
              <Edit3 />
              <span className="hidden min-[360px]:inline">Edit</span>
            </Link>
          </div>
        </div>
      </header>

      <article className="mx-auto max-w-3xl px-4 py-10 sm:px-5 sm:py-20">
        <div className="mb-8 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
          <span className="rounded-full bg-violet-500/10 px-3 py-1 font-medium text-violet-500">
            {post.category}
          </span>
          <span>
            {new Intl.DateTimeFormat("en", {
              month: "long",
              day: "numeric",
              year: "numeric",
            }).format(new Date(post.updatedAt))}
          </span>
          <span className="flex items-center gap-1.5">
            <Clock3 className="size-3.5" />
            {Math.max(1, Math.ceil(wordCount / 200))} min read
          </span>
          {post.status === "draft" && (
            <span className="rounded-full bg-amber-500/10 px-3 py-1 font-medium text-amber-500">
              Draft preview
            </span>
          )}
        </div>

        <h1 className="text-3xl font-semibold leading-[1.1] tracking-[-0.04em] text-balance min-[420px]:text-4xl sm:text-6xl">
          {post.title}
        </h1>
        <p className="mt-5 text-lg leading-7 text-muted-foreground sm:mt-7 sm:text-xl sm:leading-8">{post.excerpt}</p>

        <div className="my-8 flex items-center gap-4 border-y py-5 sm:my-10 sm:py-6">
          <div className="flex size-12 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-400 font-semibold text-white">
            {initials}
          </div>
          <div>
            <p className="font-medium">{post.author}</p>
            <p className="text-sm text-muted-foreground">Storyflow contributor</p>
          </div>
        </div>

        <div className="space-y-6 text-base leading-7 text-foreground/85 sm:space-y-7 sm:text-[1.08rem] sm:leading-8">
          {paragraphs.map((paragraph, index) =>
            index === 2 && paragraphs.length > 3 ? (
              <blockquote
                key={`${paragraph}-${index}`}
                className="my-8 border-l-2 border-violet-500 pl-5 text-xl leading-8 font-medium tracking-tight sm:my-10 sm:pl-7 sm:text-2xl sm:leading-9"
              >
                {paragraph}
              </blockquote>
            ) : (
              <p key={`${paragraph}-${index}`}>{paragraph}</p>
            )
          )}
        </div>
      </article>
    </main>
  )
}

export default RenderPost

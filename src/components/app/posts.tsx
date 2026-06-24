import {
  Clock3,
  Edit3,
  Eye,
  Feather,
  FileText,
  MoreHorizontal,
  PenLine,
  Search,
  Trash2,
} from "lucide-react"
import { useMemo, useState } from "react"
import { Link } from "react-router"

import { buttonVariants, Button } from "../ui/button"
import { cn } from "@/lib/utils"
import { type PostStatus, usePosts } from "@/lib/posts"

type Filter = "all" | PostStatus

function Posts() {
  const { posts, deletePost } = usePosts()
  const [query, setQuery] = useState("")
  const [filter, setFilter] = useState<Filter>("all")

  const filteredPosts = useMemo(() => {
    const normalized = query.toLowerCase().trim()
    return [...posts]
      .filter((post) => filter === "all" || post.status === filter)
      .filter(
        (post) =>
          !normalized ||
          post.title.toLowerCase().includes(normalized) ||
          post.category.toLowerCase().includes(normalized) ||
          post.author.toLowerCase().includes(normalized)
      )
      .sort(
        (a, b) =>
          new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
      )
  }, [filter, posts, query])

  const published = posts.filter((post) => post.status === "published").length
  const drafts = posts.length - published

  return (
    <main className="min-h-dvh bg-[linear-gradient(to_bottom,var(--background),color-mix(in_oklch,var(--muted),transparent_72%))]">
      <header className="border-b bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-5 sm:py-5 lg:px-8">
          <Link to="/" className="flex items-center gap-3 font-semibold tracking-tight">
            <span className="flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
              <Feather className="size-4" />
            </span>
            <span className="hidden min-[360px]:inline">Storyflow</span>
          </Link>
          <Link
            to="/create-post"
            className={cn(buttonVariants({ size: "sm" }), "rounded-xl shadow-sm")}
          >
            <PenLine />
            <span className="hidden min-[380px]:inline">New story</span>
          </Link>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-5 sm:py-10 lg:px-8 lg:py-14">
        <section className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <p className="mb-3 flex items-center gap-2 text-sm font-medium text-violet-500">
              <FileText className="size-4" />
              Content workspace
            </p>
            <h1 className="text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">Your stories</h1>
            <p className="mt-3 text-muted-foreground">
              Write, organize, and publish from one calm workspace.
            </p>
          </div>
          <div className="grid w-full grid-cols-3 gap-2 sm:w-auto">
            {[
              ["All", posts.length],
              ["Published", published],
              ["Drafts", drafts],
            ].map(([label, value]) => (
              <div key={label} className="min-w-0 rounded-2xl border bg-card px-2 py-3 text-center shadow-sm sm:min-w-20 sm:px-4">
                <p className="text-xl font-semibold">{value}</p>
                <p className="text-[11px] text-muted-foreground">{label}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-8 overflow-hidden rounded-[1.5rem] border bg-card shadow-sm sm:mt-10 sm:rounded-[1.7rem]">
          <div className="flex flex-col justify-between gap-3 border-b p-3 sm:flex-row sm:items-center sm:gap-4 sm:p-5">
            <div className="grid grid-cols-3 rounded-xl bg-muted p-1 sm:flex">
              {(["all", "published", "draft"] as Filter[]).map((item) => (
                <button
                  key={item}
                  onClick={() => setFilter(item)}
                  className={cn(
                    "rounded-lg px-2 py-2 text-xs font-medium capitalize transition sm:px-3",
                    filter === item
                      ? "bg-card text-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {item === "all" ? "All posts" : item === "draft" ? "Drafts" : "Published"}
                </button>
              ))}
            </div>
            <label className="flex h-11 w-full items-center gap-2 rounded-xl border bg-background px-3 sm:h-10 sm:w-64">
              <Search className="size-4 text-muted-foreground" />
              <input
                aria-label="Search posts"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search posts..."
                className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
              />
            </label>
          </div>

          {filteredPosts.length ? (
            <div className="divide-y">
              {filteredPosts.map((post) => {
                const wordCount = post.content.trim().split(/\s+/).length
                return (
                  <article
                    key={post.id}
                    className="group grid gap-4 p-4 transition hover:bg-muted/35 sm:p-6 md:grid-cols-[1fr_auto] md:items-center"
                  >
                    <div className="min-w-0">
                      <div className="mb-2 flex flex-wrap items-center gap-2">
                        <span
                          className={cn(
                            "rounded-full px-2.5 py-1 text-[11px] font-semibold capitalize",
                            post.status === "published"
                              ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                              : "bg-amber-500/10 text-amber-600 dark:text-amber-400"
                          )}
                        >
                          {post.status}
                        </span>
                        <span className="text-xs text-muted-foreground">{post.category}</span>
                      </div>
                      <Link
                        to={`/posts/${post.slug}`}
                        className="line-clamp-2 text-lg font-semibold leading-6 tracking-[-0.025em] transition hover:text-violet-500 sm:line-clamp-1 sm:text-xl"
                      >
                        {post.title}
                      </Link>
                      <p className="mt-2 line-clamp-2 text-sm leading-6 text-muted-foreground sm:line-clamp-1">
                        {post.excerpt}
                      </p>
                      <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                        <span>{post.author}</span>
                        <span>·</span>
                        <span>
                          Updated{" "}
                          {new Intl.DateTimeFormat("en", {
                            month: "short",
                            day: "numeric",
                          }).format(new Date(post.updatedAt))}
                        </span>
                        <span>·</span>
                        <span className="flex items-center gap-1">
                          <Clock3 className="size-3" />
                          {Math.max(1, Math.ceil(wordCount / 200))} min read
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 border-t pt-4 sm:border-0 sm:pt-0 md:justify-end">
                      {post.status === "published" && (
                        <Link
                          to={`/posts/${post.slug}`}
                          aria-label={`View ${post.title}`}
                          className={cn(buttonVariants({ variant: "ghost", size: "icon-sm" }), "rounded-xl sm:size-9")}
                        >
                          <Eye />
                        </Link>
                      )}
                      <Link
                        to={`/edit-post/${post.id}`}
                        aria-label={`Edit ${post.title}`}
                        className={cn(buttonVariants({ variant: "outline", size: "sm" }), "flex-1 rounded-xl sm:flex-none")}
                      >
                        <Edit3 />
                        Edit
                      </Link>
                      <Button
                        variant="ghost"
                        size="icon-sm"
                        aria-label={`Delete ${post.title}`}
                        className="ml-auto rounded-xl text-muted-foreground hover:text-destructive sm:ml-0"
                        onClick={() => deletePost(post.id)}
                      >
                        <Trash2 />
                      </Button>
                      <MoreHorizontal className="hidden size-4 text-muted-foreground" />
                    </div>
                  </article>
                )
              })}
            </div>
          ) : (
            <div className="flex flex-col items-center px-6 py-20 text-center">
              <span className="flex size-14 items-center justify-center rounded-2xl bg-muted">
                <FileText className="size-6 text-muted-foreground" />
              </span>
              <h2 className="mt-5 text-lg font-semibold">No stories found</h2>
              <p className="mt-2 max-w-sm text-sm text-muted-foreground">
                Try another search or create a new story.
              </p>
            </div>
          )}
        </section>
      </div>
    </main>
  )
}

export default Posts

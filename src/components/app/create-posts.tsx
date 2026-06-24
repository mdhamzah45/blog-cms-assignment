import { ArrowLeft, Check, Eye, Feather, Save } from "lucide-react"
import { useMemo, useState } from "react"
import type { FormEvent } from "react"
import { Link, useNavigate, useParams } from "react-router"

import { Button } from "@/components/ui/button"
import { makeSlug, type PostStatus, usePosts } from "@/lib/posts"

const Tiptap = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { posts, savePost } = usePosts()
  const existing = useMemo(() => posts.find((post) => post.id === id), [id, posts])
  const [title, setTitle] = useState(existing?.title ?? "")
  const [slug, setSlug] = useState(existing?.slug ?? "")
  const [excerpt, setExcerpt] = useState(existing?.excerpt ?? "")
  const [content, setContent] = useState(existing?.content ?? "")
  const [category, setCategory] = useState(existing?.category ?? "Ideas")
  const [author, setAuthor] = useState(existing?.author ?? "Alex Morgan")
  const [saved, setSaved] = useState(false)

  const submit = (event: FormEvent, status: PostStatus) => {
    event.preventDefault()
    if (!title.trim() || !content.trim()) return
    const post = savePost(
      {
        title: title.trim(),
        slug: slug.trim() || makeSlug(title),
        excerpt: excerpt.trim() || content.trim().slice(0, 150),
        content: content.trim(),
        category,
        author: author.trim() || "Alex Morgan",
        status,
      },
      existing?.id
    )
    setSaved(true)
    window.setTimeout(() => setSaved(false), 1800)
    if (status === "published") navigate(`/posts/${post.slug}`)
  }

  return (
    <main className="min-h-dvh bg-background pb-20 sm:pb-0">
      <header className="sticky top-0 z-20 border-b bg-background/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:px-5 sm:py-4 lg:px-8">
          <div className="flex min-w-0 items-center gap-3 sm:gap-4">
            <Link
              to="/posts"
              aria-label="Back to posts"
              className="flex size-10 shrink-0 items-center justify-center rounded-xl text-muted-foreground transition hover:bg-muted hover:text-foreground"
            >
              <ArrowLeft className="size-4" />
            </Link>
            <Link to="/" className="hidden items-center gap-2 font-semibold sm:flex">
              <Feather className="size-4 text-violet-500" />
              Storyflow
            </Link>
            <span className="hidden text-border sm:block">/</span>
            <span className="truncate text-sm font-medium text-muted-foreground">
              {existing ? "Edit story" : "New story"}
            </span>
          </div>
          <div className="hidden items-center gap-2 sm:flex">
            {saved && (
              <span className="flex items-center gap-1.5 text-xs text-emerald-500">
                <Check className="size-3.5" /> Saved
              </span>
            )}
            <Button variant="outline" size="sm" onClick={(event) => submit(event, "draft")}>
              <Save /> Save draft
            </Button>
            <Button size="sm" onClick={(event) => submit(event, "published")}>
              <Eye /> Publish
            </Button>
          </div>
        </div>
      </header>

      <form className="mx-auto grid max-w-6xl gap-7 px-4 py-7 sm:gap-10 sm:px-5 sm:py-10 lg:grid-cols-[1fr_280px] lg:px-8">
        <div className="min-w-0">
          <input
            aria-label="Post title"
            value={title}
            onChange={(event) => {
              setTitle(event.target.value)
              if (!existing) setSlug(makeSlug(event.target.value))
            }}
            placeholder="Your story title"
            className="w-full bg-transparent text-3xl font-semibold tracking-[-0.04em] outline-none placeholder:text-muted-foreground/45 sm:text-5xl"
          />
          <textarea
            aria-label="Post excerpt"
            value={excerpt}
            onChange={(event) => setExcerpt(event.target.value)}
            placeholder="Write a short, inviting description..."
            rows={2}
            className="mt-4 w-full resize-none bg-transparent text-base leading-7 text-muted-foreground outline-none placeholder:text-muted-foreground/40 sm:mt-6 sm:text-lg sm:leading-8"
          />
          <div className="my-6 border-t sm:my-8" />
          <textarea
            aria-label="Post content"
            value={content}
            onChange={(event) => setContent(event.target.value)}
            placeholder="Tell your story..."
            rows={10}
            className="min-h-[42dvh] w-full resize-none bg-transparent text-base leading-7 outline-none placeholder:text-muted-foreground/40 sm:min-h-[32rem] sm:text-[1.08rem] sm:leading-8"
          />
        </div>

        <aside className="h-fit space-y-5 rounded-3xl border bg-card p-5 shadow-sm sm:space-y-6 sm:p-6 lg:sticky lg:top-24">
          <div>
            <p className="text-sm font-semibold">Story settings</p>
            <p className="mt-1 text-xs leading-5 text-muted-foreground">
              Details used to organize and present your post.
            </p>
          </div>
          <label className="block text-xs font-medium">
            Slug
            <input
              value={slug}
              onChange={(event) => setSlug(makeSlug(event.target.value))}
              className="mt-2 h-10 w-full rounded-xl border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring/30"
            />
          </label>
          <label className="block text-xs font-medium">
            Category
            <select
              value={category}
              onChange={(event) => setCategory(event.target.value)}
              className="mt-2 h-10 w-full rounded-xl border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring/30"
            >
              <option>Ideas</option>
              <option>Design</option>
              <option>Life</option>
              <option>Culture</option>
              <option>Work</option>
            </select>
          </label>
          <label className="block text-xs font-medium">
            Author
            <input
              value={author}
              onChange={(event) => setAuthor(event.target.value)}
              className="mt-2 h-10 w-full rounded-xl border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring/30"
            />
          </label>
          <div className="rounded-2xl bg-muted p-4 text-xs leading-5 text-muted-foreground">
            {content.trim() ? content.trim().split(/\s+/).length : 0} words ·{" "}
            {Math.max(1, Math.ceil(content.trim().split(/\s+/).length / 200))} min read
          </div>
        </aside>
      </form>

      <div className="fixed inset-x-0 bottom-0 z-30 flex items-center gap-2 border-t bg-background/95 p-3 backdrop-blur-xl sm:hidden">
        <Button
          variant="outline"
          className="h-11 flex-1 rounded-xl"
          onClick={(event) => submit(event, "draft")}
        >
          <Save /> Save draft
        </Button>
        <Button
          className="h-11 flex-1 rounded-xl"
          onClick={(event) => submit(event, "published")}
        >
          <Eye /> Publish
        </Button>
      </div>
    </main>
  )
}

export default Tiptap

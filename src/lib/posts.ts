import { useCallback, useEffect, useState } from "react"

export type PostStatus = "draft" | "published"

export type BlogPost = {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  category: string
  author: string
  status: PostStatus
  createdAt: string
  updatedAt: string
}

export type PostInput = Pick<
  BlogPost,
  "title" | "slug" | "excerpt" | "content" | "category" | "author" | "status"
>

const storageKey = "storyflow-posts"
const changeEvent = "storyflow-posts-changed"

export const seedPosts: BlogPost[] = [
  {
    id: "calm-morning",
    title: "The architecture of a calm morning",
    slug: "calm-morning",
    excerpt:
      "A practical guide to designing the first hour of your day with more intention and less noise.",
    content:
      "There is a particular kind of clarity that appears when we stop trying to optimize every corner of our lives. It is quieter than ambition, but often more useful: the ability to notice what is already working.\n\nGood systems are rarely dramatic. They remove one small decision, make one useful action easier, or create enough space for attention to settle. Over time, those modest improvements compound into something that feels almost effortless.\n\nA thoughtful life is built less by grand plans than by the shape of an ordinary Tuesday.\n\nStart with the friction you feel most often. Name it without judgment, make the smallest credible adjustment, and give that adjustment enough time to become familiar.",
    category: "Life",
    author: "Maya Chen",
    status: "published",
    createdAt: "2026-06-22T09:00:00.000Z",
    updatedAt: "2026-06-22T09:00:00.000Z",
  },
  {
    id: "intentional-products",
    title: "Designing products that feel inevitable",
    slug: "intentional-products",
    excerpt:
      "What the best digital products teach us about clarity, restraint, and thoughtful defaults.",
    content:
      "The best products rarely announce how clever they are. They make the right next step feel obvious.\n\nThat sense of inevitability comes from dozens of quiet decisions: language that respects the reader, defaults that match real behavior, and interfaces that remove uncertainty instead of decorating it.\n\nRestraint is not the absence of ideas. It is the discipline to let the strongest idea lead.",
    category: "Design",
    author: "Noah Williams",
    status: "published",
    createdAt: "2026-06-18T09:00:00.000Z",
    updatedAt: "2026-06-18T09:00:00.000Z",
  },
  {
    id: "weekly-field-note",
    title: "Why every team needs a weekly field note",
    slug: "weekly-field-note",
    excerpt:
      "A lightweight writing habit that keeps decisions visible and teams moving in the same direction.",
    content:
      "A weekly field note is not a report. It is a short record of what changed, what was learned, and what deserves attention next.\n\nThe habit creates a shared memory for the team. Decisions stop disappearing into meetings, and progress becomes easier to see.",
    category: "Work",
    author: "Sam Rivera",
    status: "draft",
    createdAt: "2026-06-09T09:00:00.000Z",
    updatedAt: "2026-06-23T13:30:00.000Z",
  },
]

export function makeSlug(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
}

function readPosts(): BlogPost[] {
  const stored = localStorage.getItem(storageKey)
  if (!stored) {
    localStorage.setItem(storageKey, JSON.stringify(seedPosts))
    return seedPosts
  }

  try {
    return JSON.parse(stored) as BlogPost[]
  } catch {
    return seedPosts
  }
}

function writePosts(posts: BlogPost[]) {
  localStorage.setItem(storageKey, JSON.stringify(posts))
  window.dispatchEvent(new Event(changeEvent))
}

export function usePosts() {
  const [posts, setPosts] = useState<BlogPost[]>(readPosts)

  useEffect(() => {
    const refresh = () => setPosts(readPosts())
    window.addEventListener(changeEvent, refresh)
    window.addEventListener("storage", refresh)
    return () => {
      window.removeEventListener(changeEvent, refresh)
      window.removeEventListener("storage", refresh)
    }
  }, [])

  const savePost = useCallback((input: PostInput, id?: string) => {
    const now = new Date().toISOString()
    const current = readPosts()
    const existing = id ? current.find((post) => post.id === id) : undefined
    const post: BlogPost = {
      ...input,
      id: existing?.id ?? crypto.randomUUID(),
      createdAt: existing?.createdAt ?? now,
      updatedAt: now,
    }
    writePosts(
      existing
        ? current.map((item) => (item.id === existing.id ? post : item))
        : [post, ...current]
    )
    return post
  }, [])

  const deletePost = useCallback((id: string) => {
    writePosts(readPosts().filter((post) => post.id !== id))
  }, [])

  return { posts, savePost, deletePost }
}

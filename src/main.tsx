import { StrictMode } from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter, Routes, Route } from "react-router"

import "./index.css"
import App from "./App.tsx"
import { ThemeProvider } from "@/components/theme-provider.tsx"
import { AuthLayout } from "@/components/app/auth-layout.tsx"
import { SingUp } from "./components/app/sign-in.tsx"
import Posts from "./components/app/posts.tsx"
import RenderPost from "./components/app/render-post.tsx"
import Tiptap from "./components/app/create-posts.tsx"
const root = document.getElementById("root")
ReactDOM.createRoot(root!).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/login" element={<SingUp />} />
          <Route element={<AuthLayout />}>
            <Route path="/posts" element={<Posts />} />
            <Route path="/posts/:slug" element={<RenderPost />} />
            <Route path="/create-post" element={<Tiptap />} />
            <Route path="/edit-post/:id" element={<Tiptap />} />
            <Route path="/user" element={<div>user</div>} />
          </Route>
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>
)

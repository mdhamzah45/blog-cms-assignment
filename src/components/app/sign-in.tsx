import { authAtom } from "@/atoms/auth-atom"
import { useSetAtom } from "jotai"
import { useEffect } from "react"
import { useLocation, useNavigate } from "react-router"

export function SingUp() {
  const setAuth = useSetAtom(authAtom)
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    const from = location.state?.from
    const destination = from
      ? `${from.pathname}${from.search ?? ""}${from.hash ?? ""}`
      : "/posts"

    setAuth(true)
    navigate(destination, { replace: true })
  }, [location.state, navigate, setAuth])

  return <></>
}

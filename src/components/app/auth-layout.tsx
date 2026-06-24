import { authAtom } from "../../atoms/auth-atom"
import { useAtomValue } from "jotai"
import { Navigate, Outlet, useLocation } from "react-router"

export function AuthLayout() {
  const auth = useAtomValue(authAtom)
  const location = useLocation()

  if (!auth) {
    return <Navigate to="/login" replace state={{ from: location }} />
  }

  return <Outlet />
}

"use client"

import {
  createContext,
  MouseEvent as ReactMouseEvent,
  PropsWithChildren,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react"
import { usePathname, useSearchParams } from "next/navigation"
import { OpeningLoader } from "@/components/app/opening-loader"

type NavigationLoaderContextValue = {
  startLoading: () => void
}

const NavigationLoaderContext = createContext<NavigationLoaderContextValue | null>(null)

function isHashOnlyNavigation(currentUrl: URL, nextUrl: URL) {
  return (
    currentUrl.origin === nextUrl.origin &&
    currentUrl.pathname === nextUrl.pathname &&
    currentUrl.search === nextUrl.search &&
    currentUrl.hash !== nextUrl.hash
  )
}

export function NavigationLoaderProvider({ children }: PropsWithChildren) {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [loaderKey, setLoaderKey] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  const startLoading = useMemo(
    () => () => {
      setLoaderKey((current) => current + 1)
      setIsLoading(true)
    },
    []
  )

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0) {
        return
      }

      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
        return
      }

      const target = event.target

      if (!(target instanceof Element)) {
        return
      }

      const anchor = target.closest("a")

      if (!(anchor instanceof HTMLAnchorElement)) {
        return
      }

      if (anchor.target && anchor.target !== "_self") {
        return
      }

      if (anchor.hasAttribute("download")) {
        return
      }

      const nextUrl = new URL(anchor.href, window.location.href)
      const currentUrl = new URL(window.location.href)

      if (nextUrl.origin !== currentUrl.origin) {
        return
      }

      if (isHashOnlyNavigation(currentUrl, nextUrl)) {
        return
      }

      if (nextUrl.pathname === currentUrl.pathname && nextUrl.search === currentUrl.search) {
        return
      }

      startLoading()
    }

    document.addEventListener("click", handleClick, true)

    return () => {
      document.removeEventListener("click", handleClick, true)
    }
  }, [startLoading])

  useEffect(() => {
    if (!pathname) {
      return
    }
  }, [pathname, searchParams])

  return (
    <NavigationLoaderContext.Provider value={{ startLoading }}>
      {isLoading ? <OpeningLoader key={loaderKey} onHidden={() => setIsLoading(false)} /> : null}
      {children}
    </NavigationLoaderContext.Provider>
  )
}

export function useNavigationLoader() {
  const context = useContext(NavigationLoaderContext)

  if (!context) {
    throw new Error("useNavigationLoader must be used within NavigationLoaderProvider.")
  }

  return context
}

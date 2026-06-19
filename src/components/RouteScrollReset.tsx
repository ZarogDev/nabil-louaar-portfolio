'use client'

import { usePathname } from 'next/navigation'
import { useEffect } from 'react'

export default function RouteScrollReset() {
  const pathname = usePathname()

  useEffect(() => {
    document.documentElement.scrollTop = 0
  }, [pathname])

  return null
}

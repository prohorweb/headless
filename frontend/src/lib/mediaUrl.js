/**
 * Normalize WordPress media URL for dev proxy: use path under /wp-content so Vite can proxy.
 */
export function proxiedMediaSrc(url) {
  if (!url) return null
  try {
    const u = new URL(url, typeof window !== 'undefined' ? window.location.origin : 'http://localhost')
    if (u.pathname.includes('/wp-content/')) {
      return u.pathname + u.search
    }
    return url
  } catch {
    return url
  }
}

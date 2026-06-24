import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'

const MAX_ATTEMPTS = 5
const WINDOW_MS = 15 * 60 * 1000
const WINDOW_S = 15 * 60

let _limiter: Ratelimit | null | undefined = undefined
function getLimiter() {
  if (_limiter !== undefined) return _limiter
  if (!process.env.UPSTASH_REDIS_REST_URL || !process.env.UPSTASH_REDIS_REST_TOKEN) {
    _limiter = null
    return null
  }
  _limiter = new Ratelimit({
    redis: new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL!,
      token: process.env.UPSTASH_REDIS_REST_TOKEN!,
    }),
    limiter: Ratelimit.slidingWindow(MAX_ATTEMPTS, `${WINDOW_S} s`),
    analytics: false,
    prefix: 'nabil:rl',
  })
  return _limiter
}

interface Bucket { count: number; resetAt: number }
const store = new Map<string, Bucket>()

export async function checkRateLimit(ip: string): Promise<{ allowed: boolean; retryAfter?: number }> {
  const limiter = getLimiter()
  if (limiter) {
    const { success, reset } = await limiter.limit(ip)
    if (!success) return { allowed: false, retryAfter: Math.ceil((reset - Date.now()) / 1000) }
    return { allowed: true }
  }
  const now = Date.now()
  const bucket = store.get(ip)
  if (!bucket || now > bucket.resetAt) {
    store.set(ip, { count: 1, resetAt: now + WINDOW_MS })
    return { allowed: true }
  }
  if (bucket.count >= MAX_ATTEMPTS) {
    return { allowed: false, retryAfter: Math.ceil((bucket.resetAt - now) / 1000) }
  }
  bucket.count++
  return { allowed: true }
}

export async function resetRateLimit(ip: string): Promise<void> {
  store.delete(ip)
}

const MAX_ATTEMPTS = 5;
const WINDOW_MS = 15 * 60 * 1000; // 15 min

interface Bucket { count: number; resetAt: number }

// Module-level Map: persists within a warm Vercel instance.
// Not shared across instances (acceptable for a low-traffic admin login).
const store = new Map<string, Bucket>();

export function checkRateLimit(ip: string): { allowed: boolean; retryAfter?: number } {
  const now = Date.now();

  // Prune expired entries periodically
  if (store.size > 500) {
    for (const [key, bucket] of store.entries()) {
      if (now > bucket.resetAt) store.delete(key);
    }
  }

  const bucket = store.get(ip);

  if (!bucket || now > bucket.resetAt) {
    store.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return { allowed: true };
  }

  if (bucket.count >= MAX_ATTEMPTS) {
    return { allowed: false, retryAfter: Math.ceil((bucket.resetAt - now) / 1000) };
  }

  bucket.count++;
  return { allowed: true };
}

export function resetRateLimit(ip: string) {
  store.delete(ip);
}

// In-memory login-attempt tracker. Resets on cold start, which is an accepted
// limitation for a single-admin site with no database — it still stops naive
// brute-force loops within a warm instance.

const WINDOW_MS = 5 * 60 * 1000; // 5 minutes
const MAX_ATTEMPTS = 5;

const failuresByKey = new Map<string, number[]>();

function prune(timestamps: number[]): number[] {
  const cutoff = Date.now() - WINDOW_MS;
  return timestamps.filter((t) => t > cutoff);
}

export function getRecentFailureCount(key: string): number {
  const pruned = prune(failuresByKey.get(key) ?? []);
  failuresByKey.set(key, pruned);
  return pruned.length;
}

export function recordFailure(key: string): void {
  const pruned = prune(failuresByKey.get(key) ?? []);
  pruned.push(Date.now());
  failuresByKey.set(key, pruned);
}

export function recordSuccess(key: string): void {
  failuresByKey.delete(key);
}

export function isLockedOut(key: string): boolean {
  return getRecentFailureCount(key) >= MAX_ATTEMPTS;
}

/** Progressive delay applied before checking the password, growing with recent failures. */
export function delayForFailureCount(count: number): number {
  return Math.min(count * 600, 4000);
}

export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

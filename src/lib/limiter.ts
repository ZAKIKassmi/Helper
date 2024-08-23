import { getIp } from "./get-ip";

export class RateLimitError extends Error {
  constructor() {
    super("Rate limit exceeded");
    this.name = "RateLimitError";
  }
}

const PRUNE_INTERVAL = 60 * 1000; // 1 minute

const trackers = new Map<
string,
{
  count: number;
  expiresAt: number;
}
>();

function pruneTrackers() {
  const now = Date.now();

  for (const [key, value] of trackers.entries()) {
    if (value.expiresAt < now) {
      trackers.delete(key)
    }
  }
}

setInterval(pruneTrackers, PRUNE_INTERVAL);

export async function rateLimitByIp({
  key = "global",
  limit = 5,
  window = 10000 * 360 * 24,
}: {
  key: string;
  limit: number;
  window: number;
}) {
  const ip = getIp();

  if (!ip) {
    throw new RateLimitError();
  }

  const res = await rateLimitByKey({
    key: `${ip}-${key}`,
    limit,
    window,
  });
  return res;
}

export async function rateLimitByKey({
  key = "global",
  limit = 1,
  window = 10000,
}: {
  key: string;
  limit: number;
  window: number;
}) {
  let tracker = trackers.get(key) || { count: 0, expiresAt: 0 };

  if (tracker.expiresAt < Date.now()) {
    tracker.count = 0;
    tracker.expiresAt = Date.now() + window;
  }

  tracker.count++;

  if (tracker.count > limit) {
    return {
      message: "You have exceded the Limit",
      isError: true
    }
  }

  trackers.set(key, tracker);
}
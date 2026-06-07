const SERVICE_SHUTDOWN_AT = new Date('2026-07-08T00:00:00+09:00');

export function isServiceShutdown(now = new Date()) {
  return now >= SERVICE_SHUTDOWN_AT;
}

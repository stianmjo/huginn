export function getBackendBaseUrl() {
  return process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8080";
}

export function toBackendUrl(path: string) {
  const base = getBackendBaseUrl();
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}

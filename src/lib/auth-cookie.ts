const AUTH_COOKIE = "auth-session";
const MAX_AGE_SECONDS = 60 * 60 * 24 * 7;

export function setAuthCookie(isAuthenticated: boolean) {
  if (typeof document === "undefined") return;

  if (isAuthenticated) {
    document.cookie = `${AUTH_COOKIE}=1; path=/; max-age=${MAX_AGE_SECONDS}; SameSite=Lax`;
    return;
  }

  document.cookie = `${AUTH_COOKIE}=; path=/; max-age=0; SameSite=Lax`;
}

export function clearAuthCookie() {
  setAuthCookie(false);
}

// Safe API fetch helper for full compatibility across local dev server, Cloud Run, and static Vercel hosts.

export async function safePostApi<T>(
  endpoint: string,
  payload: any,
  fallbackGenerator: () => T
): Promise<T> {
  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const contentType = res.headers.get("content-type") || "";

    // Check if server returned valid JSON and ok status
    if (res.ok && contentType.includes("application/json")) {
      const data = await res.json();
      if (data && !data.error) {
        return data as T;
      }
    }
  } catch (err) {
    console.warn(`[SHAQILA API] Endpoint ${endpoint} is unreachable or returned non-JSON. Falling back to local AI engine.`, err);
  }

  // Fallback to local intelligent responder if endpoint returns 404 HTML, 500 HTML, or network error
  return fallbackGenerator();
}

export async function safeGetApi<T>(
  endpoint: string,
  fallbackGenerator: () => T
): Promise<T> {
  try {
    const res = await fetch(endpoint);
    const contentType = res.headers.get("content-type") || "";

    if (res.ok && contentType.includes("application/json")) {
      const data = await res.json();
      if (data) return data as T;
    }
  } catch (err) {
    console.warn(`[SHAQILA API] Endpoint ${endpoint} is unreachable. Falling back to local data.`, err);
  }

  return fallbackGenerator();
}

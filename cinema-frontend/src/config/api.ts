const configuredApiBaseUrl = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:9090";

export const apiBaseUrl = configuredApiBaseUrl.replace(/\/$/, "");

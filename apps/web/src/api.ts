const DEFAULT_API_BASE_URL = 'http://127.0.0.1:8000'
const rawApiBase = import.meta.env.VITE_API_BASE_URL || DEFAULT_API_BASE_URL

export function getApiBaseUrl(): string {
  return rawApiBase.replace(/\/$/, '')
}

export const API_BASE_URL = getApiBaseUrl()

export class ApiError extends Error {
  status: number
  constructor(message: string, status: number) {
    super(message)
    this.name = 'ApiError'
    this.status = status
  }
}

export type ContentIndexItem = { title: string; path: string; category: string; description?: string }
export type ContentIndexResponse = { items: ContentIndexItem[] }
export type ContentSearchItem = { title: string; path: string; snippet: string }
export type ContentSearchResponse = { items: ContentSearchItem[] }

export function apiUrl(path: string): string {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`
  return `${getApiBaseUrl()}${normalizedPath}`
}

async function parseJsonResponse<T>(response: Response, fallbackMessage: string): Promise<T> {
  const responseText = await response.text()
  let data: unknown = {}
  if (responseText.trim()) {
    try { data = JSON.parse(responseText) }
    catch { throw new ApiError(response.ok ? 'Backend returned invalid JSON.' : fallbackMessage, response.status) }
  }
  if (!response.ok) {
    const detail = typeof data === 'object' && data && 'detail' in data ? String(data.detail) : fallbackMessage
    throw new ApiError(detail, response.status)
  }
  return data as T
}

export async function loadMarkdown(contentPath: string, signal?: AbortSignal): Promise<string> {
  const response = await fetch(apiUrl(`/api/content/markdown?path=${encodeURIComponent(contentPath)}`), { signal })
  const responseText = await response.text()
  if (!response.ok) {
    let detail = 'This Markdown page could not be loaded.'
    try {
      const parsed = JSON.parse(responseText) as { detail?: string }
      if (parsed.detail) detail = parsed.detail
    } catch {}
    throw new ApiError(detail, response.status)
  }
  return responseText
}

export async function loadContentIndex(root?: string, signal?: AbortSignal): Promise<ContentIndexResponse> {
  const params = root ? `?root=${encodeURIComponent(root)}` : ''
  const response = await fetch(apiUrl(`/api/content/index${params}`), { signal })
  const data = await parseJsonResponse<Partial<ContentIndexResponse>>(response, 'Content index could not be loaded.')
  return { items: data.items ?? [] }
}

export async function searchContent(query: string, signal?: AbortSignal): Promise<ContentSearchResponse> {
  const response = await fetch(apiUrl(`/api/content/search?q=${encodeURIComponent(query)}`), { signal })
  const data = await parseJsonResponse<Partial<ContentSearchResponse>>(response, 'Content search could not be loaded.')
  return { items: data.items ?? [] }
}

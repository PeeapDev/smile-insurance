export function loadArray<T = any>(key: string): T[] {
  try {
    const raw = localStorage.getItem(key)
    const arr = raw ? JSON.parse(raw) : []
    return Array.isArray(arr) ? arr : []
  } catch {
    return []
  }
}

export function saveArray<T = any>(key: string, items: T[]) {
  try { localStorage.setItem(key, JSON.stringify(items)) } catch {}
}

export function pushArray<T = any>(key: string, item: T) {
  const arr = loadArray<T>(key)
  arr.unshift(item)
  saveArray(key, arr)
  return arr
}

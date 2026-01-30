const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:8000'

export async function uploadImage(file: File, confidence = 0.3) {
  const form = new FormData()
  form.append('file', file)
  const res = await fetch(`${API_BASE}/detect?confidence=${confidence}`, {
    method: 'POST',
    body: form,
  })
  if (!res.ok) throw new Error('API error')
  return res.json()
}

export async function getHistory(limit = 50) {
  const res = await fetch(`${API_BASE}/history?limit=${limit}`)
  if (!res.ok) throw new Error('API error')
  return res.json()
}


const API_BASE = import.meta.env.VITE_API_BASE || 'http://127.0.0.1:8000';

/**
 * Uploads a Swaralipi image for YOLOv8 notation detection.
 * @param file The image file captured from the camera or gallery.
 * @param confidence The model threshold (default 0.3).
 */
export async function uploadImage(file: File, confidence = 0.3) {
  const form = new FormData();
  // Ensure 'file' matches the parameter name in your FastAPI Python function
  form.append('file', file);

  try {
    const res = await fetch(`${API_BASE}/detect?confidence=${confidence}`, {
      method: 'POST',
      body: form,
      // Note: Do not set Content-Type header manually when sending FormData; 
      // the browser will automatically set it with the correct boundary.
    });

    if (!res.ok) {
      // Attempt to parse server-side error messages (e.g., from FastAPI HTTPException)
      const errorDetail = await res.json().catch(() => ({ detail: 'Unknown Server Error' }));
      throw new Error(errorDetail.detail || `HTTP Error ${res.status}`);
    }

    return await res.json();
  } catch (error) {
    console.error("Critical API Error (uploadImage):", error);
    // Rethrowing allows the UI (Scan.tsx) to catch the error and show an alert
    throw error;
  }
}

/**
 * Fetches the history of previous notation scans.
 * @param limit Number of records to retrieve.
 */
export async function getHistory(limit = 50) {
  try {
    const res = await fetch(`${API_BASE}/history?limit=${limit}`, {
      method: 'GET',
    });

    if (!res.ok) throw new Error(`HTTP Error ${res.status}`);

    return await res.json();
  } catch (error) {
    console.error("Critical API Error (getHistory):", error);
  
    return [];
  }
}
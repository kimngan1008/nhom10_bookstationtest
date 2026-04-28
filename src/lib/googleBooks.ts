const API_BASE = "https://www.googleapis.com/books/v1/volumes";

export interface GoogleBookInfo {
  id: string;
  title: string;
  authors: string[];
  description: string;
  thumbnail: string;
}

export async function searchGoogleBookId(title: string, author: string): Promise<string | null> {
  try {
    const q = encodeURIComponent(`${title} ${author}`);
    const res = await fetch(`${API_BASE}?q=${q}&maxResults=5`);
    if (!res.ok) return null;
    const data = await res.json();
    if (!data.items?.length) return null;
    return data.items[0].id as string;
  } catch {
    return null;
  }
}

export async function getGoogleBookInfo(id: string): Promise<GoogleBookInfo | null> {
  try {
    const res = await fetch(`${API_BASE}/${id}`);
    if (!res.ok) return null;
    const item = await res.json();
    const info = item.volumeInfo;
    return {
      id: item.id,
      title: info.title ?? "",
      authors: info.authors ?? [],
      description: info.description ?? "",
      thumbnail:
        (info.imageLinks?.thumbnail ?? "").replace("http:", "https:"),
    };
  } catch {
    return null;
  }
}

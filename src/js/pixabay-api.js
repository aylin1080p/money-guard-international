export function fetchImages(query) {
  console.log(`fetchImages called with query: ${query}`);

  return Promise.resolve({
    hits: [],
    totalHits: 0,
  });
}
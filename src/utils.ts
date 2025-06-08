import type { Artist, Item } from "./types/spotify.types";

export const getArtistNames = (artists: Artist[]) => {
  let names = "";

  for (const artist of artists) {
    names += `${artist.name} `;
  }

  return names;
};

export const filterSongMatch = (items: Item[], keyword: string) => {
  keyword = keyword.toLowerCase();

  // 1. Exact match
  let filteredTracks = items.filter(
    (track) => track.name.toLowerCase() === keyword,
  );

  // 2. Full word match (if no exact match)
  if (filteredTracks.length === 0) {
    filteredTracks = items.filter((track) => {
      const nameWords = track.name.toLowerCase().split(/\s+/);
      return nameWords.includes(keyword);
    });
  }

  // 3. Final fallback - keyword as substring
  if (filteredTracks.length === 0) {
    filteredTracks = items
      .filter((track) => track.name.toLowerCase().includes(keyword))
      .sort((a, b) => {
        // Optional: prioritize shortest track name and earliest keyword position
        const aName = a.name.toLowerCase();
        const bName = b.name.toLowerCase();

        const aIndex = aName.indexOf(keyword);
        const bIndex = bName.indexOf(keyword);

        const aScore = aName.length + aIndex;
        const bScore = bName.length + bIndex;

        return aScore - bScore; // Lower score = better match
      });
  }

  return filteredTracks;
};

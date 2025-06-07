import type { Artist } from "./types/spotify.types";

export const getArtistNames = (artists: Artist[]) => {
  let names = "";

  for (const artist of artists) {
    names += `${artist.name} `;
  }

  return names;
};

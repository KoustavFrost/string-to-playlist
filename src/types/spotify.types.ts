export interface SpotifyTrackSearchReponse {
  tracks: Tracks;
}

export interface Tracks {
  href: string;
  limit: number;
  next: string;
  offset: number;
  previous?: unknown;
  total: number;
  items: Item[];
}

export interface Item {
  album: Album;
  artists: Artist[];
  available_markets: string[];
  disc_number: number;
  duration_ms: number;
  explicit: boolean;
  external_ids: ExternalIds;
  external_urls: ExternalUrls;
  href: string;
  id: string;
  is_local: boolean;
  is_playable: boolean;
  name: string;
  popularity: number;
  preview_url?: unknown;
  track_number: number;
  type: string;
  uri: string;
}

export interface Album {
  album_type: string;
  artists: Artist[];
  available_markets: string[];
  external_urls: ExternalUrls;
  href: string;
  id: string;
  images: Image[];
  is_playable: boolean;
  name: string;
  release_date: string;
  release_date_precision: string;
  total_tracks: number;
  type: string;
  uri: string;
}

export interface Artist {
  external_urls: ExternalUrls;
  href: string;
  id: string;
  name: string;
  type: string;
  uri: string;
}

export interface Image {
  height: number;
  width: number;
  url: string;
}

interface ExternalUrls {
  spotify: string;
}

interface ExternalIds {
  isrc: string;
}

export interface CustomTrack {
  keyword: string;
  artists: Artist[];
  name: string;
  trackId: string;
  spotifyUrl?: string;
  uri?: string;
}

"use client";

import axios from "axios";
import { useState } from "react";
import type {
  CustomTrack,
  Item,
  SpotifyTrackSearchReponse,
  Tracks,
} from "../types/spotify.types";
import PreviewPlaylist from "./previewPlaylist";
import { filterSongMatch } from "../utils";

export default function CreatePlaylist() {
  const [sentence, setSentence] = useState("");
  const [playlist, setPlaylist] = useState<CustomTrack[]>([]);
  const songsMap = new Map();

  const getASong = async (keyword: string) => {
    if (songsMap.has(keyword.toLowerCase())) {
      const songs: Item[] = songsMap.get(keyword.toLowerCase()) as Item[];

      return songs[0];
    } else {
      const filteredTracks: Item[] | undefined = await searchSpotify(keyword);

      if (!filteredTracks || filteredTracks.length === 0) {
        return;
      }

      // setting the map
      songsMap.set(keyword.toLowerCase(), filteredTracks);

      return filteredTracks[0];
    }
  };

  const searchSpotify = async (keyword: string) => {
    try {
      const query = encodeURIComponent(keyword);
      const url = `https://api.spotify.com/v1/search?q=${query}&type=track&&limit=50`;
      const token = localStorage.getItem("spotifyAccessToken");

      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const responseData: SpotifyTrackSearchReponse =
        response.data as SpotifyTrackSearchReponse;

      const tracks: Tracks = responseData.tracks;

      // filtering with the keyword
      const filteredTracks = filterSongMatch(tracks.items, keyword);

      return filteredTracks ?? [];
    } catch (error) {
      console.error(error);
    }
  };

  const searchUsingSentence = async (e: React.FormEvent) => {
    e.preventDefault();
    setPlaylist([]);

    if (!sentence) {
      alert("A sentence is needed!");
    }

    const sentenceSplitArray = sentence.trim().split(" ");

    // eslint-disable-next-line @typescript-eslint/prefer-for-of
    for (let i = 0; i < sentenceSplitArray.length; i++) {
      const str = sentenceSplitArray[i];
      if (!str) continue;

      const song: Item | undefined = await getASong(str.toLowerCase());

      if (song) {
        const customTrack: CustomTrack = {
          keyword: str,
          artists: song.artists,
          name: song.name,
          trackId: song.id,
          spotifyUrl: song.external_urls?.spotify,
          uri: song.uri,
        };
        setPlaylist((prev) => [...prev, customTrack]);
      } else {
        const customTrack: CustomTrack = {
          keyword: str,
          artists: [],
          name: "",
          trackId: str,
          spotifyUrl: "",
          uri: "",
        };
        setPlaylist((prev) => [...prev, customTrack]);
        console.log(`failed to find a song for ${str}`);
      }
    }
  };

  return (
    <>
      <h1 className="text-center text-2xl font-bold text-gray-800">
        📝 Create Playlist from Sentence
      </h1>
      <div className="space-y-4">
        <input
          type="text"
          placeholder="Enter a sentence like 'crying in the club'"
          value={sentence}
          onChange={(e) => setSentence(e.target.value)}
          className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="button"
          onClick={searchUsingSentence}
          className="w-full rounded-xl bg-green-600 py-3 font-medium text-white transition hover:bg-green-700"
        >
          Step 1. Search Up Songs
        </button>
      </div>
      {playlist.length > 0 && (
        <div className="space-y-4">
          <p>Preview</p>
          <PreviewPlaylist playlist={playlist} sentence={sentence} />
        </div>
      )}
    </>
  );
}

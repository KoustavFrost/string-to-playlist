"use client";

import { useEffect, useState } from "react";
import type { CustomTrack } from "../types/spotify.types";
import axios from "axios";

interface PlaylistProps {
  playlist: CustomTrack[];
  sentence: string;
}

export default function Playlist({ playlist, sentence }: PlaylistProps) {
  const [userId, setUserId] = useState<string | null>(null);
  const [userName, setUserName] = useState<string | null>(null);
  const [readonly, setReadonly] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const storedId = localStorage.getItem("spotifyUserId");
    const storedName = localStorage.getItem("spotifyUserName");

    if (storedId) {
      setUserId(storedId);
      setUserName(storedName);
      setReadonly(true);
    }
  }, []);

  const getUserDetails = () => {
    if (readonly || loading) return;

    setLoading(true);

    const accessToken = localStorage.getItem("spotifyAccessToken");
    if (!accessToken) {
      alert("Access token not found.");
      setLoading(false);
      return;
    }

    axios
      .get("https://api.spotify.com/v1/me", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const { id, display_name } = response.data;
        localStorage.setItem("spotifyUserId", id as string);
        localStorage.setItem("spotifyUserName", display_name as string);
        setUserId(id as string);
        setUserName(display_name as string);
        setReadonly(true);
      })
      .catch((error) => {
        console.error("Failed to get user details:", error);
        alert("Failed to fetch Spotify user details.");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const createSpotifyPlaylist = async () => {
    const url = `https://api.spotify.com/v1/users/${userId}/playlists`;
    const accessToken = localStorage.getItem("spotifyAccessToken");

    try {
      const response = await axios.post(
        url,
        {
          name: sentence,
          description: `i was created using Just Another Average Programmer's tool`,
          public: true,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );

      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const playlistDetails = response.data;

      // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access
      return playlistDetails.id;
    } catch (error) {
      console.log(error);
    }
  };

  const pushSongsToPlaylist = async (playlistId: string) => {
    try {
      const uris = playlist.map((item) => item.uri);

      const url = `https://api.spotify.com/v1/playlists/${playlistId}/tracks`;
      const accessToken = localStorage.getItem("spotifyAccessToken");

      const response = await axios.post(
        url,
        {
          uris: uris,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );

      if (response.data) {
        alert("Done and dusted! Check your spotify account");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const createPlaylistOnSpotify = async () => {
    const result = confirm(
      "Are you sure you want to create this playlist and become supercool 😎?",
    );

    if (result) {
      const playlistId: string = (await createSpotifyPlaylist()) as string;

      await pushSongsToPlaylist(playlistId);
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={getUserDetails}
        disabled={readonly}
        className={`w-full rounded-xl py-3 font-medium text-white transition ${
          readonly
            ? "cursor-not-allowed bg-gray-500"
            : loading
              ? "bg-yellow-700"
              : "bg-yellow-600 hover:bg-green-700"
        }`}
      >
        {loading
          ? "Loading..."
          : userName
            ? `Hi, ${userName}`
            : "Step 2. Get Me"}
      </button>

      <button
        type="button"
        disabled={!readonly}
        onClick={createPlaylistOnSpotify}
        className={`w-full rounded-xl py-3 font-medium text-white transition ${
          !readonly
            ? "cursor-not-allowed bg-gray-500"
            : "bg-yellow-600 hover:bg-green-700"
        }`}
      >
        {"Step 3. Create Playlist?"}
      </button>
    </>
  );
}

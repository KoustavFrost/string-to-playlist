"use client";

import { useEffect, useState } from "react";
import axios from "axios";

export default function GetSpotifyUserButton() {
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

  return (
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
      {loading ? "Loading..." : userName ? `Hi, ${userName}` : "Step 2. Get Me"}
    </button>
  );
}

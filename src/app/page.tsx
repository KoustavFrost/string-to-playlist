"use client";

import { useEffect, useState } from "react";
import CreatePlaylist from "./createPlaylist";

export default function HomePage() {
  const clientId = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID;
  const [accessToken, setAccessToken] = useState<string | null>(null);

  // Check for token on load
  useEffect(() => {
    const token = localStorage.getItem("spotifyAccessToken");
    if (token) setAccessToken(token);
  }, []);

  const authenticateWithSpotify = () => {
    const redirectUri =
      process.env.NEXT_PUBLIC_REDIRECT_URI ??
      "http://127.0.0.1:3000/api/callback";

    const authUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=code&redirect_uri=${
      redirectUri
    }&scope=playlist-modify-public%20playlist-modify-private`;

    window.location.href = authUrl;
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-xl space-y-6 rounded-2xl bg-white p-8 shadow-lg">
        {!accessToken ? (
          <>
            <h1 className="text-center text-2xl font-bold text-gray-800">
              🎧 Connect Your Spotify App
            </h1>
            <p className="text-sm text-gray-600">
              1. Go to{" "}
              <a
                href="https://developer.spotify.com/dashboard"
                target="_blank"
                rel="noreferrer"
                className="text-blue-600 underline"
              >
                Spotify Developer Dashboard
              </a>
              <br />
              2. Create a new app.
              <br />
              3. Make sure to give a callback URL(If running this application
              locally, then you can use http://127.0.0.1:3000/api/callback). And
              don&apos;t forget to check Web API below.
              <br />
              4. Get hold of the Client ID and Client Secret and paste it in the
              .env file.
              <br />
              5. That&apos;s it, you should be good to go to authenticate.
            </p>
            <div className="space-y-4">
              <button
                type="button"
                onClick={authenticateWithSpotify}
                className="w-full rounded-xl bg-blue-600 py-3 font-medium text-white transition hover:bg-blue-700"
              >
                Authenticate with Spotify
              </button>
            </div>
          </>
        ) : (
          <>
            <CreatePlaylist />
            <button
              onClick={() => {
                localStorage.removeItem("spotifyAccessToken");
                localStorage.removeItem("spotifyRefreshToken");
                localStorage.removeItem("spotifyUserId");
                localStorage.removeItem("spotifyUserName");
                setAccessToken(null);
              }}
              className="mt-4 text-xs text-gray-500 underline hover:text-gray-800"
            >
              Log out / change token
            </button>
          </>
        )}
      </div>
    </main>
  );
}

"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AuthSuccessPage() {
  const router = useRouter();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const accessToken = params.get("access_token");
    const refreshToken = params.get("refresh_token");

    if (accessToken && refreshToken) {
      localStorage.setItem("spotifyAccessToken", accessToken);
      localStorage.setItem("spotifyRefreshToken", refreshToken);
    }

    // Redirect back to home
    router.push("/");
  }, [router]);

  return (
    <main className="flex min-h-screen items-center justify-center">
      <p className="text-lg text-gray-600">Setting up your session... 🎧</p>
    </main>
  );
}

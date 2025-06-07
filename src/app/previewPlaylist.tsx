import Link from "next/link";
import type { CustomTrack } from "../types/spotify.types";
import { getArtistNames } from "../utils";

interface PreviewPlaylistProps {
  playlist: CustomTrack[];
}

export default function PreviewPlaylist({ playlist }: PreviewPlaylistProps) {
  return (
    <div className="space-y-2 p-4">
      {playlist.map((track, index) => (
        <div
          key={track.trackId + index}
          className="flex items-center justify-between rounded-lg border border-gray-300 px-4 py-2 shadow-sm hover:bg-gray-50"
        >
          <div className="text-sm font-medium text-gray-700">
            <span className="text-blue-600">{track.keyword}</span> —{" "}
            <span className="text-black">{track.name}</span> —{" "}
            <span className="text-black">{getArtistNames(track.artists)}</span>
          </div>
          {track.spotifyUrl ? (
            <Link
              href={track.spotifyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-green-600 hover:underline"
            >
              Open in Spotify
            </Link>
          ) : (
            <span>Failed to find a song</span>
          )}
        </div>
      ))}
    </div>
  );
}

'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState, useRef } from 'react';

declare global {
  interface Window {
    Hls: any;
  }
}

export default function WatchEpisode() {
  const { seriesId, episodeId } = useParams();
  const [videoUrl, setVideoUrl] = useState('');
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (episodeId) {
      fetch(`http://localhost:3001/api/series/${seriesId}`)
        .then(res => res.json())
        .then(series => {
          const episode = series.seasons
            ?.flatMap((s: any) => s.episodes)
            ?.find((ep: any) => ep.id === episodeId);
          if (episode?.videoUrl) setVideoUrl(episode.videoUrl);
        })
        .catch(() => {});
    }
  }, [seriesId, episodeId]);

  useEffect(() => {
    if (videoUrl && videoRef.current) {
      const loadHls = async () => {
        if (typeof window !== 'undefined' && !window.Hls) {
          const Hls = (await import('hls.js')).default;
          window.Hls = Hls;
        }
        
        const Hls = window.Hls;
        if (Hls && Hls.isSupported()) {
          const hls = new Hls();
          hls.loadSource(videoUrl);
          hls.attachMedia(videoRef.current!);
        } else if (videoRef.current?.canPlayType('application/vnd.apple.mpegurl')) {
          videoRef.current.src = videoUrl;
        }
      };
      loadHls();
    }
  }, [videoUrl]);

  return (
    <main className="min-h-screen bg-black flex items-center justify-center">
      {videoUrl ? (
        <video
          ref={videoRef}
          controls
          autoPlay
          className="w-full max-w-6xl"
        >
          Votre navigateur ne supporte pas la lecture vidéo.
        </video>
      ) : (
        <div className="text-white">Chargement de l'épisode...</div>
      )}
    </main>
  );
}
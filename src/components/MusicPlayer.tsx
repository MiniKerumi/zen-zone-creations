import { Music2, Pause, Play, SkipBack, SkipForward, Volume2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";

import bgmCover from "@/assets/bgm-cover.png";
import dailyLifeLeisure from "@/assets/daily-life-leisure.mp3";
import dailyLifeFreedom from "@/assets/daily-life-freedom.mp3";
import reverieSerenity from "@/assets/reverie-serenity.mp3";
import vr from "@/assets/vr.mp3";
import hia from "@/assets/hia.mp3";
import strivingPort from "@/assets/striving-port.mp3";
import reveriePassion from "@/assets/reverie-passion.mp3";

const tracks = [
  { title: "Daily Life · Leisure", artist: "Sān-Z / HOYO-MiX", src: dailyLifeLeisure },
  { title: "Daily Life · Freedom", artist: "Sān-Z", src: dailyLifeFreedom },
  { title: "Reverie · Serenity", artist: "Sān-Z", src: reverieSerenity },
  { title: "Vr", artist: "Sān-Z", src: vr },
  { title: "Hia", artist: "Sān-Z", src: hia },
  { title: "争流口岸", artist: "Sān-Z", src: strivingPort },
  { title: "Reverie · Passion", artist: "Sān-Z", src: reveriePassion },
] as const;

function formatTime(seconds: number) {
  if (!Number.isFinite(seconds)) return "0:00";

  return `${Math.floor(seconds / 60)}:${Math.floor(seconds % 60)
    .toString()
    .padStart(2, "0")}`;
}

export function MusicPlayer() {
  const [trackIndex, setTrackIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const audioRef = useRef<HTMLAudioElement>(null);

  const currentTrack = tracks[trackIndex] ?? tracks[0];

  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) return;

    if (playing) {
      audio.play().catch(() => setPlaying(false));
    } else {
      audio.pause();
    }
  }, [playing, trackIndex]);

  const changeTrack = (direction: number) => {
    setTrackIndex(
      (current) => (current + direction + tracks.length) % tracks.length,
    );

    setCurrentTime(0);
  };

  return (
    <section
      aria-label="Background music player"
      className="fixed bottom-3 left-1/2 z-40 w-[calc(100%-1.5rem)] max-w-2xl -translate-x-1/2 border border-primary/60 bg-popover/95 shadow-[6px_6px_0_var(--color-secondary)] backdrop-blur-xl"
    >
      <audio
        ref={audioRef}
        src={currentTrack.src}
        preload="metadata"
        onTimeUpdate={(event) => setCurrentTime(event.currentTarget.currentTime)}
        onLoadedMetadata={(event) => setDuration(event.currentTarget.duration)}
        onEnded={() => changeTrack(1)}
      />

      <div className="flex h-[76px] items-center gap-3 p-2 sm:gap-4">
        <div
          className={`cover-frame h-[58px] w-[58px] shrink-0 overflow-hidden border border-foreground/30 ${
            playing ? "is-playing" : ""
          }`}
        >
          <img
            src={bgmCover}
            alt="Background music cover artwork"
            className="h-full w-full object-cover object-center"
          />

          <Music2
            className="absolute bottom-1 right-1 h-4 w-4 bg-background/80 p-0.5 text-accent"
            aria-hidden="true"
          />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-baseline justify-between gap-2">
            <div className="min-w-0">
              <p className="truncate text-xs font-bold uppercase text-primary">
                {currentTrack.title}
              </p>

              <p className="truncate text-[11px] text-muted-foreground">
                {currentTrack.artist} · {trackIndex + 1}/{tracks.length}
              </p>
            </div>

            <span className="hidden text-[10px] tabular-nums text-muted-foreground sm:block">
              {formatTime(currentTime)} / {formatTime(duration)}
            </span>
          </div>

          <input
            aria-label="Seek through current track"
            type="range"
            min="0"
            max={duration || 0}
            value={currentTime}
            onChange={(event) => {
              const value = Number(event.target.value);

              setCurrentTime(value);

              if (audioRef.current) {
                audioRef.current.currentTime = value;
              }
            }}
            className="music-range mt-2 w-full"
          />
        </div>

        <div className="flex shrink-0 items-center">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => changeTrack(-1)}
            aria-label="Previous track"
            className="rounded-none"
          >
            <SkipBack />
          </Button>

          <Button
            size="icon"
            onClick={() => setPlaying((value) => !value)}
            aria-label={playing ? "Pause music" : "Play music"}
            className="rounded-none bg-accent text-accent-foreground hover:bg-accent/85"
          >
            {playing ? <Pause /> : <Play />}
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => changeTrack(1)}
            aria-label="Next track"
            className="rounded-none"
          >
            <SkipForward />
          </Button>

          <Volume2
            className="ml-1 hidden h-4 w-4 text-muted-foreground sm:block"
            aria-hidden="true"
          />
        </div>
      </div>
    </section>
  );
}

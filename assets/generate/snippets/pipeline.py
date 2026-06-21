from dataclasses import dataclass
from functools import cache


@dataclass(frozen=True)
class Track:
    title: str
    bpm: int = 120

    @property
    def is_uptempo(self) -> bool:
        return self.bpm >= 128


@cache
def neon_label(track: Track) -> str:
    """Return a short, human label for a track."""
    mood = "drive" if track.is_uptempo else "chill"
    return f"{track.title} ({track.bpm} bpm, {mood})"


if __name__ == "__main__":
    deck = [Track("Outrun", 140), Track("Midnight", 96)]
    for t in deck:
        print(neon_label(t))

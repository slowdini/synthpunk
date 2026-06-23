using System.Linq;
using System.Threading.Tasks;

namespace Synthpunk.Audio;

/// <summary>Streams and ranks tracks by tempo.</summary>
public sealed class TrackService(IClock clock)
{
    public required string Channel { get; init; }

    public async Task<int> CountUptempoAsync(Track[] tracks)
    {
        await Task.Delay(10);
        return tracks.Count(t => t.Bpm >= 128);
    }

    // Format a track for the now-playing line.
    public string Tag(Track t) =>
        $"[{clock.Now:HH:mm}] {t.Title} — {t.Bpm} bpm";
}

public record Track(string Title, int Bpm);

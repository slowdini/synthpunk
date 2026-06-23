import { useState, useEffect } from "react";

interface CounterProps {
  label: string;
  initial?: number;
}

// A tiny counter that shifts hue as it climbs.
export function Counter({ label, initial = 0 }: CounterProps) {
  const [count, setCount] = useState(initial);
  const hue = (count * 24) % 360;

  useEffect(() => {
    document.title = `${label}: ${count}`;
  }, [label, count]);

  return (
    <button
      className="counter"
      style={{ color: `hsl(${hue}, 90%, 65%)` }}
      onClick={() => setCount((c) => c + 1)}
    >
      {label} → {count}
    </button>
  );
}

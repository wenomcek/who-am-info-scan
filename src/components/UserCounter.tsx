import { useState, useEffect } from "react";

interface UserCounterProps {
  className?: string;
}

export function UserCounter({ className = "" }: UserCounterProps) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    // Start with a random number between 5000 and 10000
    const startingCount = Math.floor(Math.random() * 5000) + 5000;
    setCount(startingCount);

    // Increment counter randomly
    const interval = setInterval(() => {
      setCount(c => c + 1);
    }, Math.random() * 10000 + 5000); // Random interval between 5-15 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`text-muted-foreground ${className}`}>
      <p className="text-sm">
        Total Scans: <span className="font-bold text-blue-400">{count.toLocaleString()}</span>
      </p>
    </div>
  );
}
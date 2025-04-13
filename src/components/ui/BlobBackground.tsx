"use client";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import BlobSceneDark from "./BlobSceneDark";
import BlobSceneLight from "./BlobSceneLight";

export default function BlobBackground() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Wait until after client hydration to show the background
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <>
      {theme === "dark" ? (
        <BlobSceneDark
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: -1,
            overflow: "hidden",
            pointerEvents: "none", // so it doesn’t interfere with interactions
          }}
        />
      ) : (
        <BlobSceneLight
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: -1,
            overflow: "hidden",
            pointerEvents: "none",
          }}
        />
      )}
    </>
  );
}

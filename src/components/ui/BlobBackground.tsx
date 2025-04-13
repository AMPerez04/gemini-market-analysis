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
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            zIndex: -1,
            pointerEvents: "none",
          }}
        />
      ) : (
        <BlobSceneLight
        style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            zIndex: -1,
            pointerEvents: "none",
          }}
        />
      )}
    </>
  );
}

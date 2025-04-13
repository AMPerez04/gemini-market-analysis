import React from "react";

/**
 * A utility function that lightens or darkens a given HEX color by a percentage.
 * 
 * @param {string} hexColor - Original color in #RRGGBB format.
 * @param {number} amount - Lighten (positive) or darken (negative) percentage from -100 to +100.
 * @returns {string} - Modified color in #RRGGBB format.
 */
function adjustHexColor(hexColor, amount) {
  // Strip leading '#' if present
  let color = hexColor.replace(/^#/, "");

  // Parse the r/g/b values
  let r = parseInt(color.substring(0, 2), 16);
  let g = parseInt(color.substring(2, 4), 16);
  let b = parseInt(color.substring(4, 6), 16);

  // Convert the amount to [0..1] range factor for lighten/darken
  const factor = amount / 100;

  // For each channel, add or subtract the corresponding portion
  r = Math.round(r + (factor * (255 - r)));
  g = Math.round(g + (factor * (255 - g)));
  b = Math.round(b + (factor * (255 - b)));

  // Clamp between 0 and 255
  r = Math.max(Math.min(255, r), 0);
  g = Math.max(Math.min(255, g), 0);
  b = Math.max(Math.min(255, b), 0);

  // Convert back to #RRGGBB
  const rr = (r < 16 ? "0" : "") + r.toString(16);
  const gg = (g < 16 ? "0" : "") + g.toString(16);
  const bb = (b < 16 ? "0" : "") + b.toString(16);

  return `#${rr}${gg}${bb}`;
}

/**
 * FreeformBackground
 * 
 * Generates a wave-like SVG background.
 * - Pass a `primaryColor` prop to control the main color (defaults to #6f42c1).
 * - You can adjust the style or wave paths for different artistic effects.
 */
export default function FreeformBackground({
  primaryColor = "#6f42c1",
  style = {},
  className = "",
}) {
  // Create lighter version for a gradient effect
  const lighterColor = adjustHexColor(primaryColor, 40);

  return (
    <div
      className={className}
      style={{
        position: "absolute", // Changed from "relative" to "absolute"
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        overflow: "hidden",
        ...style,
      }}
    >
      <svg
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
        }}
      >
        <defs>
          <linearGradient id="freeformGradient" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor={lighterColor} />
            <stop offset="100%" stopColor={primaryColor} />
          </linearGradient>
        </defs>

        {/* First wave path */}
        <path
          fill="url(#freeformGradient)"
          fillOpacity="1"
          d="M0,192L60,165.3C120,139,240,85,360,64C480,43,600,53,720,85.3C840,117,960,171,1080,176C1200,181,1320,139,1380,117.3L1440,96V320H1380H1320H1200H1080H960H840H720H600H480H360H240H120H0Z"
        />

        {/* Second wave path for layering effect (optional) */}
        <path
          fill="url(#freeformGradient)"
          fillOpacity="0.7"
          d="M0,96L40,112C80,128,160,160,240,160C320,160,400,128,480,128C560,128,640,160,720,170.7C800,181,880,171,960,165.3C1040,160,1120,160,1200,165.3C1280,171,1360,181,1400,186.7L1440,192V320H1400H1360H1280H1200H1120H1040H960H880H800H720H640H560H480H400H320H240H160H80H0Z"
        />
      </svg>
    </div>
  );
}

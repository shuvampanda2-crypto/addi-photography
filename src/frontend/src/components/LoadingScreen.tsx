import { useEffect, useState } from "react";

interface LoadingScreenProps {
  onComplete: () => void;
}

export function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [phase, setPhase] = useState<
    "idle" | "flash1" | "flash2" | "text" | "exit"
  >("idle");

  useEffect(() => {
    // Camera intro visible for 0.8s, then first flash
    const t1 = setTimeout(() => setPhase("flash1"), 900);
    // Second flash at 1.7s
    const t2 = setTimeout(() => setPhase("flash2"), 1700);
    // Brand text appears at 2.1s
    const t3 = setTimeout(() => setPhase("text"), 2100);
    // Start exit fade at 3.1s
    const t4 = setTimeout(() => setPhase("exit"), 3100);
    // Call onComplete at 3.7s (after fade-out)
    const t5 = setTimeout(() => onComplete(), 3700);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
    };
  }, [onComplete]);

  const isFlashing = phase === "flash1" || phase === "flash2";
  const showText = phase === "text" || phase === "exit";
  const isExiting = phase === "exit";

  return (
    <div
      className="loading-screen"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#0B0B0B",
        overflow: "hidden",
        animation: isExiting ? "loadingExit 0.6s ease-in forwards" : undefined,
      }}
    >
      {/* Flash overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundColor: "#ffffff",
          opacity: 0,
          pointerEvents: "none",
          animation: isFlashing
            ? "cameraFlash 0.35s ease-out forwards"
            : undefined,
        }}
      />

      {/* Subtle vignette */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.85) 100%)",
          pointerEvents: "none",
        }}
      />

      {/* Camera SVG */}
      <div
        style={{
          position: "relative",
          animation:
            "cameraReveal 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards",
        }}
      >
        <CameraIllustration />
      </div>

      {/* Brand text */}
      <div
        style={{
          marginTop: "2rem",
          textAlign: "center",
          opacity: showText ? 1 : 0,
          transform: showText ? "translateY(0)" : "translateY(12px)",
          transition: "opacity 0.6s ease-out, transform 0.6s ease-out",
        }}
      >
        <p
          style={{
            fontFamily: "'Poppins', sans-serif",
            fontSize: "0.65rem",
            letterSpacing: "0.35em",
            textTransform: "uppercase",
            color: "#C7A46C",
            marginBottom: "0.35rem",
          }}
        >
          Est. Cuttack, Odisha
        </p>
        <h1
          style={{
            fontFamily: "'Poppins', sans-serif",
            fontSize: "clamp(1.1rem, 3vw, 1.6rem)",
            fontWeight: 300,
            letterSpacing: "0.12em",
            color: "#ffffff",
            margin: 0,
            lineHeight: 1.3,
          }}
        >
          Addi Photography
          <span style={{ color: "#C7A46C" }}> &amp; </span>
          Bj Events
        </h1>
        <p
          style={{
            fontFamily: "'Poppins', sans-serif",
            fontSize: "0.65rem",
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.45)",
            marginTop: "0.5rem",
          }}
        >
          Capturing Moments Creating Memories
        </p>
      </div>

      {/* Loading bar */}
      {showText && (
        <div
          style={{
            marginTop: "2.5rem",
            width: "120px",
            height: "1px",
            background: "rgba(255,255,255,0.1)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(90deg, transparent, #C7A46C, transparent)",
              animation: "loadingBar 1s ease-out forwards",
            }}
          />
        </div>
      )}
    </div>
  );
}

function CameraIllustration() {
  return (
    <svg
      width="180"
      height="150"
      viewBox="0 0 180 150"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ filter: "drop-shadow(0 0 30px rgba(199, 164, 108, 0.15))" }}
      aria-label="Camera illustration"
    >
      <title>Camera illustration</title>
      {/* Camera body */}
      <rect
        x="10"
        y="40"
        width="160"
        height="100"
        rx="10"
        fill="#1a1a1a"
        stroke="#2a2a2a"
        strokeWidth="1.5"
      />
      {/* Top accent border */}
      <rect
        x="10"
        y="40"
        width="160"
        height="3"
        rx="1"
        fill="#C7A46C"
        opacity="0.6"
      />

      {/* Viewfinder bump on top */}
      <rect
        x="65"
        y="25"
        width="50"
        height="18"
        rx="5"
        fill="#222222"
        stroke="#2e2e2e"
        strokeWidth="1"
      />
      {/* Hotshoe rail */}
      <rect
        x="75"
        y="22"
        width="30"
        height="5"
        rx="2"
        fill="#2d2d2d"
        stroke="#C7A46C"
        strokeWidth="0.8"
        opacity="0.8"
      />

      {/* Flash / pop-up flash indicator */}
      <rect
        x="118"
        y="28"
        width="22"
        height="14"
        rx="3"
        fill="#242424"
        stroke="#C7A46C"
        strokeWidth="0.8"
        opacity="0.7"
      />
      <rect
        x="122"
        y="31"
        width="14"
        height="7"
        rx="1.5"
        fill="#C7A46C"
        opacity="0.25"
      />
      {/* Flash glow lines */}
      <line
        x1="127"
        y1="31"
        x2="123"
        y2="27"
        stroke="#C7A46C"
        strokeWidth="0.8"
        opacity="0.5"
      />
      <line
        x1="129"
        y1="31"
        x2="129"
        y2="26"
        stroke="#C7A46C"
        strokeWidth="0.8"
        opacity="0.5"
      />
      <line
        x1="131"
        y1="31"
        x2="135"
        y2="27"
        stroke="#C7A46C"
        strokeWidth="0.8"
        opacity="0.5"
      />

      {/* Shutter button */}
      <circle
        cx="145"
        cy="40"
        r="7"
        fill="#262626"
        stroke="#C7A46C"
        strokeWidth="1.2"
      />
      <circle
        cx="145"
        cy="40"
        r="4"
        fill="#C7A46C"
        opacity="0.7"
        style={{ animation: "shutterPulse 0.6s ease-out 0.9s both" }}
      />

      {/* Mode dial */}
      <circle cx="28" cy="40" r="9" fill="#222" stroke="#333" strokeWidth="1" />
      <circle
        cx="28"
        cy="40"
        r="6"
        fill="#1a1a1a"
        stroke="#C7A46C"
        strokeWidth="0.6"
        opacity="0.5"
      />
      <line
        x1="28"
        y1="32"
        x2="28"
        y2="35"
        stroke="#C7A46C"
        strokeWidth="1"
        opacity="0.8"
      />

      {/* === LENS === */}
      {/* Outer lens ring / barrel */}
      <circle
        cx="90"
        cy="95"
        r="44"
        fill="#111"
        stroke="#2a2a2a"
        strokeWidth="2"
        style={{ animation: "lensZoom 2s ease-in-out infinite" }}
      />
      {/* Gold trim ring 1 */}
      <circle
        cx="90"
        cy="95"
        r="44"
        fill="none"
        stroke="#C7A46C"
        strokeWidth="1.5"
        opacity="0.45"
      />
      {/* Filter ring */}
      <circle
        cx="90"
        cy="95"
        r="39"
        fill="#131313"
        stroke="#222"
        strokeWidth="1"
      />
      {/* Inner barrel */}
      <circle
        cx="90"
        cy="95"
        r="33"
        fill="#0d0d0d"
        stroke="#1e1e1e"
        strokeWidth="1"
      />
      {/* Gold trim ring 2 */}
      <circle
        cx="90"
        cy="95"
        r="33"
        fill="none"
        stroke="#C7A46C"
        strokeWidth="0.8"
        opacity="0.35"
      />
      {/* Focus ring markings */}
      {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((angle) => {
        const rad = (angle * Math.PI) / 180;
        const r1 = 36;
        const r2 = 39;
        const x1 = 90 + r1 * Math.cos(rad);
        const y1 = 95 + r1 * Math.sin(rad);
        const x2 = 90 + r2 * Math.cos(rad);
        const y2 = 95 + r2 * Math.sin(rad);
        return (
          <line
            key={angle}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke="#C7A46C"
            strokeWidth="0.6"
            opacity="0.4"
          />
        );
      })}
      {/* Aperture / glass element */}
      <circle
        cx="90"
        cy="95"
        r="26"
        fill="#0a0a0a"
        stroke="#181818"
        strokeWidth="1"
      />
      {/* Glass sheen */}
      <circle
        cx="90"
        cy="95"
        r="26"
        fill="none"
        stroke="rgba(199,164,108,0.2)"
        strokeWidth="1"
      />
      {/* Inner glass gradient simulation */}
      <circle cx="90" cy="95" r="22" fill="#080808" />
      <circle cx="90" cy="95" r="18" fill="#050505" />
      {/* Center lens element */}
      <circle cx="90" cy="95" r="13" fill="#030303" />
      <circle cx="90" cy="95" r="9" fill="#020202" />
      {/* Lens reflection highlight */}
      <ellipse
        cx="82"
        cy="87"
        rx="5"
        ry="3"
        fill="rgba(255,255,255,0.06)"
        transform="rotate(-30, 82, 87)"
      />
      <ellipse
        cx="84"
        cy="88"
        rx="2"
        ry="1"
        fill="rgba(255,255,255,0.12)"
        transform="rotate(-30, 84, 88)"
      />

      {/* Body grip texture lines */}
      {[0, 3, 6, 9, 12].map((i) => (
        <rect
          key={i}
          x={152 + i}
          y="50"
          width="1"
          height="80"
          rx="0.5"
          fill="#2a2a2a"
          opacity="0.6"
        />
      ))}

      {/* Bottom branding strip */}
      <rect
        x="10"
        y="132"
        width="160"
        height="8"
        rx="0 0 10 10"
        fill="#161616"
      />
      <text
        x="90"
        y="139"
        textAnchor="middle"
        fontFamily="Poppins, sans-serif"
        fontSize="5"
        fill="#C7A46C"
        opacity="0.6"
        letterSpacing="2"
      >
        ADDI PHOTOGRAPHY
      </text>
    </svg>
  );
}

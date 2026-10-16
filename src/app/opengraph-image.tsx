import { ImageResponse } from "next/og";
import { profile } from "@/content/profile";

export const alt = profile.title;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const dynamic = "force-static";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background:
            "radial-gradient(circle at 80% 10%, rgba(37,78,160,0.75), transparent 55%), radial-gradient(circle at 0% 100%, rgba(76,52,160,0.45), transparent 50%), #070b16",
          color: "#e8eefc",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ fontSize: 28, letterSpacing: 6, color: "#7cc4ff", fontWeight: 700 }}>
          AHMED SAMIR
        </div>
        <div style={{ display: "flex", flexDirection: "column", fontSize: 84, fontWeight: 800, lineHeight: 1.05, marginTop: 32 }}>
          <span>{profile.headline.lead}</span>
          <span
            style={{
              backgroundImage: "linear-gradient(90deg, #7cc4ff, #a78bfa)",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            {profile.headline.accent}
          </span>
        </div>
        <div style={{ fontSize: 32, marginTop: 36, color: "#a9b4cc" }}>
          AWS Cloud & Serverless Architect · London · Remote
        </div>
      </div>
    ),
    size,
  );
}

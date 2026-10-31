import { ImageResponse } from "next/og";

// The picture shown when a link to the site is shared (social networks, chat).
export const alt = "MaidMatch, aide m\u00e9nag\u00e8re \u00e0 domicile";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

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
          background: "#0f766e",
          color: "#ffffff",
        }}
      >
        <div style={{ fontSize: 110, fontWeight: 700 }}>MaidMatch</div>
        <div style={{ fontSize: 48, marginTop: 24 }}>
          {"Aide m\u00e9nag\u00e8re \u00e0 domicile"}
        </div>
        <div style={{ fontSize: 36, marginTop: 16, opacity: 0.85 }}>
          {"Demandez un devis en quelques minutes"}
        </div>
      </div>
    ),
    { ...size },
  );
}

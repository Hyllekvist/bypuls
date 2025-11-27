import "./global.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ByPuls – Boligmarkedet. Live. Lokalt.",
  description: "ByPuls viser den aktuelle puls på boligmarkedet i Danmark – live, lokalt og datadrevet.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="da">
      <body>
        <div className="main-shell">{children}</div>
      </body>
    </html>
  );
}

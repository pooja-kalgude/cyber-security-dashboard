import "./globals.css";

export const metadata = {
    title: "Cybersecurity Integration Network",
    description: "Explore cybersecurity vendors and integrations.",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    );
}
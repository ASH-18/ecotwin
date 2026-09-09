import './globals.css'

export const metadata = {
  title: 'EcoTwin-X Dashboard',
  description: 'AI-driven Digital Twin platform',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}


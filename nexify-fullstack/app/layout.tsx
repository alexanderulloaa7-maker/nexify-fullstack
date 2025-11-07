import "./globals.css";
export const metadata = { title:"Nexify System", description:"Bookings, payments, portal, and AI support/assistant." };
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className="bg-surface text-white antialiased">
        <header className="sticky top-0 z-30 border-b border-surface-outline backdrop-blur bg-surface/80">
          <div className="mx-auto max-w-4xl px-4 py-3 flex items-center gap-3">
            <div className="h-6 w-6 rounded-md bg-brand"></div>
            <span className="font-medium">Nexify System</span>
            <nav className="ml-auto flex gap-4 text-sm">
              <a href="/portal" className="text-white/80 hover:text-white">Portal</a>
              <a href="/demo" className="text-white/80 hover:text-white">Booking Demo</a>
              <a href="/support" className="text-white/80 hover:text-white">Support Chat</a>
              <a href="/assistant" className="text-white/80 hover:text-white">Personal Assistant</a>
            </nav>
          </div>
        </header>
        {children}
      </body>
    </html>
  );
}

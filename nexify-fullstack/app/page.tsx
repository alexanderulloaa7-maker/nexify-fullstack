import Link from "next/link";
export default function Home(){
  return (
    <main className="mx-auto max-w-4xl px-4 py-10 space-y-8">
      <h1 className="text-3xl font-semibold">All-in-one: booking + payments + AI support + personal assistant.</h1>
      <p className="text-white/70">Deploy-ready Nexify stack.</p>
      <div className="flex flex-wrap gap-3">
        <Link href="/portal" className="rounded-bubble bg-brand px-4 py-2">Client Portal</Link>
        <Link href="/demo" className="rounded-bubble bg-surface-raised border border-surface-outline px-4 py-2">Booking Demo</Link>
        <Link href="/support" className="rounded-bubble bg-surface-raised border border-surface-outline px-4 py-2">Support Chat</Link>
        <Link href="/assistant" className="rounded-bubble bg-surface-raised border border-surface-outline px-4 py-2">Personal Assistant</Link>
      </div>
    </main>
  );
}

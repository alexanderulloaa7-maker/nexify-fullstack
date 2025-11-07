import Link from "next/link";
export default function Billing(){
  return (
    <main className="mx-auto max-w-3xl px-4 py-6 space-y-3">
      <h1 className="text-xl font-semibold">Billing</h1>
      <p className="text-white/70 text-sm">Start subscription via Stripe Checkout.</p>
      <Link href="/api/billing/checkout" className="rounded-bubble bg-brand px-3 py-2 inline-block text-sm">Start subscription</Link>
      <p className="text-xs text-white/50">Set STRIPE_SECRET_KEY + STRIPE_PRICE_ID in env.</p>
    </main>
  );
}

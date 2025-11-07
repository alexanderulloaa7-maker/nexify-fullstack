import Link from "next/link";
export default function Portal(){
  return (
    <main className="mx-auto max-w-4xl px-4 py-6 space-y-6">
      <h1 className="text-2xl font-semibold">Client Portal</h1>
      <div className="grid md:grid-cols-3 gap-4">
        <Card title="Services" href="/portal/services" desc="Create and price your services."/>
        <Card title="Availability" href="/portal/availability" desc="Define weekly hours."/>
        <Card title="Bookings" href="/portal/bookings" desc="Manage bookings."/>
        <Card title="Billing" href="/portal/billing" desc="Subscription management."/>
        <Card title="Site" href="/portal/site" desc="Theme & publish your site."/>
        <Card title="AI" href="/portal/ai" desc="Support chat + Assistant settings."/>
      </div>
    </main>
  );
}
function Card({ title, href, desc }: {title:string; href:string; desc:string}){
  return (
    <Link href={href} className="rounded-2xl border border-surface-outline p-4 bg-surface-raised block hover:border-brand/60">
      <div className="font-medium">{title}</div>
      <div className="text-xs text-white/60 mt-1">{desc}</div>
    </Link>
  );
}

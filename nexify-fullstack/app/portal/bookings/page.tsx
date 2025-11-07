'use client';
import { useEffect, useState } from 'react';
type Booking = { id:string; service_id:string; name:string; phone:string; slot:string; status:string; amount_cents:number };
export default function Bookings(){
  const [items,setItems]=useState<Booking[]>([]);
  useEffect(()=>{ fetch('/api/bookings/list').then(r=>r.json()).then(d=>setItems(d.items||[])); },[]);
  return (
    <main className="mx-auto max-w-3xl px-4 py-6 space-y-3">
      <h1 className="text-xl font-semibold">Bookings</h1>
      {items.length===0 && <p className="text-white/60 text-sm">No bookings yet.</p>}
      <div className="space-y-2">
        {items.map(b=>(
          <div key={b.id} className="rounded-xl border border-surface-outline p-3 bg-surface-raised">
            <div className="text-sm"><b>{b.service_id}</b> — {b.name} ({b.phone||'no phone'})</div>
            <div className="text-xs text-white/60">{new Date(b.slot).toLocaleString()} • ${ (b.amount_cents/100).toFixed(2) } • {b.status}</div>
          </div>
        ))}
      </div>
    </main>
  );
}

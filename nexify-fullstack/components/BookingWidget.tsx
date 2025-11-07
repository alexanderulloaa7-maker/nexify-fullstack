'use client';
import { useState } from 'react';
const META: Record<string,{label:string; priceCents:number; depositCents:number; durationMin:number}> = {
  "basic-wax":  { label:"Basic Wax",  priceCents:3000, depositCents:2000, durationMin:30 },
  "deluxe-wax": { label:"Deluxe Wax", priceCents:5000, depositCents:2000, durationMin:45 }
};
export function BookingWidget({ orgId }: { orgId: string }){
  const [serviceId, setServiceId] = useState<keyof typeof META>("basic-wax");
  const [slot, setSlot] = useState<string>(()=>new Date(Date.now()+72*3600*1000).toISOString().slice(0,16));
  const [name, setName] = useState(""); const [phone, setPhone] = useState("");
  const s = META[serviceId];
  const submit = async () => {
    const res = await fetch('/api/bookings/create', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ orgId, serviceId, slot, name, phone }) });
    const data = await res.json(); if (data.checkout_url) window.location.href = data.checkout_url; else alert(JSON.stringify(data));
  };
  return (<div className="rounded-2xl border border-surface-outline p-4 bg-surface-raised space-y-3">
    <div className="flex gap-3">
      <select className="bg-transparent border border-surface-outline rounded px-2 py-2 flex-1" value={serviceId} onChange={e=>setServiceId(e.target.value as any)}>
        {Object.entries(META).map(([id,m])=>(<option key={id} value={id}>{m.label} — ${ (m.priceCents/100).toFixed(2) } ({m.durationMin}m)</option>))}
      </select>
      <input type="datetime-local" className="bg-transparent border border-surface-outline rounded px-2 py-2" value={slot} onChange={e=>setSlot(e.target.value)} />
    </div>
    <div className="flex gap-3">
      <input placeholder="Your name" className="bg-transparent border border-surface-outline rounded px-3 py-2 flex-1" value={name} onChange={e=>setName(e.target.value)} />
      <input placeholder="Phone" className="bg-transparent border border-surface-outline rounded px-3 py-2 flex-1" value={phone} onChange={e=>setPhone(e.target.value)} />
    </div>
    <button onClick={submit} className="rounded-bubble bg-brand px-4 py-2">Pay ${ (s.depositCents/100).toFixed(2) } Deposit & Confirm</button>
  </div>);
}

'use client';
import { useState } from 'react';
type Service = { id: string; name: string; durationMin: number; priceCents: number; depositCents: number; active: boolean };
export default function Services(){
  const [services, setServices] = useState<Service[]>([
    { id:'basic-wax', name:'Basic Wax', durationMin:30, priceCents:3000, depositCents:2000, active:true },
    { id:'deluxe-wax', name:'Deluxe Wax', durationMin:45, priceCents:5000, depositCents:2000, active:true }
  ]);
  const add = () => setServices(s => [...s, { id: crypto.randomUUID(), name:"New Service", durationMin:30, priceCents:4500, depositCents:2000, active:true }]);
  return (
    <main className="mx-auto max-w-3xl px-4 py-6 space-y-4">
      <h1 className="text-xl font-semibold">Services</h1>
      <button onClick={add} className="rounded-bubble bg-brand px-3 py-2 text-sm">Add service</button>
      <ul className="space-y-2">
        {services.map(s => (
          <li key={s.id} className="rounded-xl border border-surface-outline p-3 bg-surface-raised grid md:grid-cols-6 gap-2 items-center">
            <input className="bg-transparent outline-none border border-surface-outline rounded px-2 py-1 md:col-span-2" defaultValue={s.name}/>
            <div className="text-sm">Duration <input className="w-16 bg-transparent outline-none border border-surface-outline rounded px-2 py-1 ml-1" defaultValue={s.durationMin}/>m</div>
            <div className="text-sm">Price $<input className="w-20 bg-transparent outline-none border border-surface-outline rounded px-2 py-1 ml-1" defaultValue={(s.priceCents/100).toFixed(2)}/></div>
            <div className="text-sm">Deposit $<input className="w-20 bg-transparent outline-none border border-surface-outline rounded px-2 py-1 ml-1" defaultValue={(s.depositCents/100).toFixed(2)}/></div>
            <label className="text-sm flex items-center gap-2 justify-end"><input type="checkbox" defaultChecked={s.active}/> active</label>
          </li>
        ))}
      </ul>
      <p className="text-xs text-white/50">Wire to DB via API later.</p>
    </main>
  );
}

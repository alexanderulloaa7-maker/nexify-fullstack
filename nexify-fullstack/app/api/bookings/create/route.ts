import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import Stripe from "stripe";
const META: Record<string,{label:string; priceCents:number; depositCents:number; durationMin:number}> = {
  "basic-wax":{label:"Basic Wax",priceCents:3000,depositCents:2000,durationMin:30},
  "deluxe-wax":{label:"Deluxe Wax",priceCents:5000,depositCents:2000,durationMin:45}
};
export async function POST(req: Request){
  const { orgId, serviceId, slot, name, phone } = await req.json();
  if(!orgId||!serviceId||!slot||!name) return NextResponse.json({error:"Missing"}, {status:400});
  const m = META[serviceId]; if(!m) return NextResponse.json({error:"Invalid service"}, {status:400});
  const u=process.env.NEXT_PUBLIC_SUPABASE_URL||""; const k=process.env.SUPABASE_SERVICE_ROLE||""; const sk=process.env.STRIPE_SECRET_KEY||""; const site=process.env.NEXT_PUBLIC_SITE_URL||"http://localhost:3000";
  if(!u||!k||!sk) return NextResponse.json({error:"Server not configured"}, {status:500});
  const s=createClient(u,k); const stripe=new Stripe(sk, { apiVersion: "2024-06-20" as any });
  const { data: b, error } = await s.from("bookings").insert({ org_id:orgId, service_id:serviceId, name, phone, slot, status:"pending", amount_cents:m.depositCents }).select().single();
  if(error) return NextResponse.json({error:error.message},{status:500});
  const session = await stripe.checkout.sessions.create({
    mode:"payment",
    success_url:`${site}/portal/bookings`,
    cancel_url:`${site}/demo`,
    line_items:[{ price_data:{ currency:"usd", unit_amount:m.depositCents, product_data:{ name:`${m.label} — Deposit`, description:`Booking for ${name} on ${new Date(slot).toLocaleString()}` } }, quantity:1 }],
    metadata:{ booking_id:b.id, org_id:orgId, service_id:serviceId }
  });
  await s.from("bookings").update({ stripe_session_id: session.id }).eq("id", b.id);
  return NextResponse.json({ checkout_url: session.url });
}

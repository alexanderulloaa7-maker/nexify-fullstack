'use client';
import { useRef, useState } from 'react';
export function PersonalAssistant(){
  const [messages, setMessages] = useState<{role:'user'|'assistant'; content:string}[]>([{ role:'assistant', content:'I am your Mini GPT-5 assistant. Ask me anything.' }]);
  const formRef = useRef<HTMLFormElement>(null);
  const send = async (formData: FormData) => {
    const text = (formData.get('prompt') as string) || '';
    if (!text.trim()) return;
    setMessages(m=>[...m, { role:'user', content:text }]);
    formRef.current?.reset();
    const res = await fetch('/api/chat/assistant', { method:'POST', body: JSON.stringify({ messages: [...messages, { role:'user', content:text }] }) });
    const data = await res.json().catch(()=>({ reply:'Demo assistant reply' }));
    setMessages(m=>[...m, { role:'assistant', content: data.reply || 'Demo assistant reply' }]);
  };
  return (<div className="rounded-2xl border border-surface-outline p-4 bg-surface-raised">
    <div className="space-y-2 max-h-96 overflow-y-auto pr-1">
      {messages.map((m,i)=>(<div key={i} className={`w-full flex ${m.role==='user'?'justify-end':'justify-start'}`}>
        <div className={`max-w-[80%] px-4 py-2 rounded-bubble text-sm leading-relaxed border ${m.role==='user' ? 'bg-brand text-white border-transparent' : 'bg-surface border-surface-outline text-white/90'}`}>{m.content}</div>
      </div>))}
    </div>
    <form ref={formRef} action={send} className="mt-3 relative">
      <input name="prompt" placeholder="Plan my week, gym plan, marketing ideas..." className="w-full rounded-bubble bg-surface border border-surface-outline px-4 py-3 pr-24 outline-none" />
      <button className="absolute right-1.5 top-1.5 h-9 px-4 rounded-bubble bg-brand text-white text-sm">Send</button>
    </form>
  </div>);
}

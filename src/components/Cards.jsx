import React from 'react';

export function ServiceCard({ service }) {
  const Icon = service.icon;
  return (
    <div className="glass rounded-3xl overflow-hidden hover:-translate-y-1 transition min-h-[280px]">
      {service.image && (
        <div className="h-40 bg-cover bg-center" style={{ backgroundImage: `url(${service.image})` }} />
      )}
      <div className="p-7">
        <div className="w-14 h-14 rounded-2xl bg-gold/15 text-gold grid place-items-center mb-6">
          <Icon size={28} />
        </div>
        <h3 className="font-serif text-2xl mb-3">{service.title}</h3>
        <p className="text-zinc-400 leading-7">{service.text}</p>
      </div>
    </div>
  );
}

export function StatCard({ icon: Icon, value, label }) {
  return (
    <div className="glass rounded-3xl p-7 flex items-center gap-5">
      <div className="text-gold"><Icon size={34} /></div>
      <div>
        <p className="text-3xl font-black">{value}</p>
        <p className="text-zinc-400">{label}</p>
      </div>
    </div>
  );
}

export function PriceCard({ cat, items }) {
  return (
    <div className="glass rounded-3xl overflow-hidden">
      <div className="p-7 border-b border-gold/10">
        <h3 className="font-serif text-3xl text-gold">{cat}</h3>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-1">
        {items.map((item) => (
          <div key={item.name} className="group flex gap-4 p-5 border-b border-white/10 last:border-b-0 hover:bg-white/[0.03] transition">
            <div
              className="w-24 h-24 rounded-2xl bg-zinc-900 bg-cover bg-center border border-gold/10 shrink-0"
              style={{ backgroundImage: `url(${item.image})` }}
            />
            <div className="flex-1 min-w-0">
              <p className="text-zinc-100 font-semibold leading-6">{item.name}</p>
              <p className="text-gold font-black text-lg mt-2">{item.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

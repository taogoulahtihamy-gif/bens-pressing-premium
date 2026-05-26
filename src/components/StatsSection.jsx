import React from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { Shirt, Users, Truck, Star } from 'lucide-react';
import SectionHeader from './SectionHeader';
import AnimatedSection from './AnimatedSection';

function Counter({ end, suffix = '', duration = 2000 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let startTime = null;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, end, duration]);

  return (
    <span ref={ref} className="text-5xl md:text-6xl font-black text-gold">
      {count}{suffix}
    </span>
  );
}

const stats = [
  { icon: Shirt, end: 2500, suffix: '+', label: 'Vêtements nettoyés' },
  { icon: Users, end: 800, suffix: '+', label: 'Clients satisfaits' },
  { icon: Truck, end: 24, suffix: 'h', label: 'Livraison express' },
  { icon: Star, end: 98, suffix: '%', label: 'Satisfaction' },
];

export default function StatsSection() {
  return (
    <AnimatedSection>
      <section className="section relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(212,175,55,0.06),transparent_60%)]" />
        <div className="containerx relative">
          <SectionHeader
            eyebrow="Chiffres"
            title="Ben’s Pressing en chiffres"
            text="Des résultats concrets qui parlent de notre engagement qualité."
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((s) => (
              <div key={s.label} className="glass rounded-3xl p-8 text-center group hover:bg-white/[0.04] transition-all duration-500">
                <div className="w-16 h-16 rounded-2xl bg-gold/15 text-gold grid place-items-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-500">
                  <s.icon size={30} />
                </div>
                <Counter end={s.end} suffix={s.suffix} />
                <p className="text-zinc-400 mt-3 text-lg">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </AnimatedSection>
  );
}

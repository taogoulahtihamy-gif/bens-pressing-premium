import React from 'react';
import { Link } from 'react-router-dom';
import { CalendarDays, ArrowRight, Shield, Clock, Star, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import SectionHeader from '../components/SectionHeader';
import { services } from '../data/services';
import { ServiceCard, StatCard } from '../components/Cards';
import WhyChooseUs from '../components/WhyChooseUs';
import StatsSection from '../components/StatsSection';
import Testimonials from '../components/Testimonials';
import Gallery from '../components/Gallery';

export default function Home() {
  return (
    <>
      <section className="relative overflow-hidden min-h-[calc(100vh-80px)] flex items-center noise">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_65%_30%,rgba(212,175,55,.18),transparent_35%),linear-gradient(90deg,#0B0B0B_0%,rgba(11,11,11,.82)_50%,rgba(11,11,11,.6)_100%)]" />
        <div className="containerx relative py-24 grid lg:grid-cols-2 gap-16 items-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <p className="text-gold font-black tracking-[.45em] text-xs uppercase mb-6">Premium • Rapide • Fiable</p>
            <h1 className="font-serif text-5xl md:text-7xl xl:text-8xl leading-[.95] max-w-4xl">
              Le pressing premium <span className="gold-gradient">nouvelle génération</span>
            </h1>
            <p className="mt-8 text-zinc-300 text-lg md:text-xl leading-9 max-w-2xl">
              Un service d'exception pour vos vêtements. Qualité premium, livraison express et satisfaction garantie.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <Link to="/booking" className="btn-gold inline-flex justify-center items-center gap-2">
                <CalendarDays size={18} /> Réserver maintenant
              </Link>
              <Link to="/services" className="btn-dark inline-flex justify-center items-center gap-2">
                Voir nos services <ArrowRight size={18} />
              </Link>
            </div>
            <div className="mt-10 grid sm:grid-cols-3 gap-4">
              <Mini icon={Shield} t="Qualité premium" />
              <Mini icon={Clock} t="Livraison 24h" />
              <Mini icon={Star} t="Satisfaction 100%" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="relative"
          >
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              className="glass rounded-[2rem] overflow-hidden relative"
            >
              <img
                src="https://images.unsplash.com/photo-1604335399105-a0c585fd81a1?auto=format&fit=crop&w=1200&q=85"
                alt="Pressing premium"
                className="w-full h-[520px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(212,175,55,0.15),transparent_50%)]" />
              <div className="absolute bottom-0 left-0 right-0 p-8 md:p-10">
                <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 text-sm text-gold font-bold mb-4">
                  <Sparkles size={14} /> Service Premium
                </div>
                <p className="text-2xl md:text-3xl font-serif text-white leading-tight">
                  Un soin expert pour chaque textile
                </p>
              </div>
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold to-transparent opacity-60" />
              <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold to-transparent opacity-60" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="section">
        <div className="containerx">
          <SectionHeader
            eyebrow="Services"
            title="Un soin premium pour chaque textile"
            text="Ben's Pressing combine expertise, rapidité et suivi digital pour simplifier la gestion de vos vêtements."
          />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.slice(0, 3).map((s) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <ServiceCard service={s} />
              </motion.div>
            ))}
          </div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="glass rounded-[2rem] mt-10 p-10 md:p-14 grid lg:grid-cols-2 gap-8 items-center"
          >
            <div>
              <p className="text-gold uppercase tracking-[.35em] text-xs font-black mb-4">Collecte à domicile</p>
              <h2 className="font-serif text-4xl md:text-5xl">Votre pressing sans déplacement</h2>
              <p className="text-zinc-400 mt-5 leading-8">
                Planifiez un créneau, nous collectons vos vêtements, puis nous vous les livrons propres, repassés et emballés.
              </p>
            </div>
            <Link to="/booking" className="btn-gold justify-self-start lg:justify-self-end">
              Réserver une collecte
            </Link>
          </motion.div>
        </div>
      </section>

      <WhyChooseUs />
      <StatsSection />
      <Testimonials />
      <Gallery />
    </>
  );
}

function Mini({ icon: Icon, t }) {
  return (
    <div className="glass rounded-2xl p-4 flex items-center gap-3">
      <Icon className="text-gold" size={22} />
      <span className="text-sm font-bold">{t}</span>
    </div>
  );
}

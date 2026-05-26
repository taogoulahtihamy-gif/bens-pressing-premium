import React from 'react';
import { motion } from 'framer-motion';
import { Truck, Home, Gem, MessageCircle, Clock, Sparkles } from 'lucide-react';
import SectionHeader from './SectionHeader';
import AnimatedSection from './AnimatedSection';

const reasons = [
  { icon: Truck, title: 'Livraison express 24h', text: 'Retour de vos vêtements propres et repassés en moins de 24 heures chrono.' },
  { icon: Home, title: 'Collecte à domicile', text: 'Nous venons chercher vos vêtements et vous les livrons où vous voulez.' },
  { icon: Gem, title: 'Qualité premium', text: 'Des produits haut de gamme et un savoir-faire artisanal pour un résultat irréprochable.' },
  { icon: MessageCircle, title: 'Service client rapide', text: 'Une réponse sous 5 minutes sur WhatsApp pour toutes vos demandes.' },
  { icon: Clock, title: 'Ponctualité garantie', text: 'Respect absolu des délais de livraison convenus avec vous.' },
  { icon: Sparkles, title: 'Traitement professionnel', text: 'Chaque textile est traité selon ses spécificités avec des produits adaptés.' },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

export default function WhyChooseUs() {
  return (
    <AnimatedSection>
      <section className="section">
        <div className="containerx">
          <SectionHeader
            eyebrow="Pourquoi nous"
            title="Pourquoi choisir Ben’s Pressing ?"
            text="Nous repensons le pressing pour qu'il soit plus simple, plus rapide et plus premium."
          />
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {reasons.map((r, i) => (
              <motion.div
                key={r.title}
                variants={cardVariants}
                className="glass rounded-3xl p-8 group hover:bg-white/[0.04] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_0_40px_rgba(212,175,55,0.08)]"
              >
                <div className="w-14 h-14 rounded-2xl bg-gold/15 text-gold grid place-items-center mb-6 group-hover:scale-110 transition-transform duration-500">
                  <r.icon size={28} />
                </div>
                <h3 className="font-serif text-2xl mb-3">{r.title}</h3>
                <p className="text-zinc-400 leading-7">{r.text}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </AnimatedSection>
  );
}

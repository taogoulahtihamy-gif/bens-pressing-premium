import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import SectionHeader from './SectionHeader';
import AnimatedSection from './AnimatedSection';

const testimonials = [
  {
    name: 'Awa Diop',
    role: 'Cliente régulière',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
    text: 'Service impeccable ! Mes robes ressortent toujours parfaites. La collecte à domicile est un vrai gain de temps.',
    rating: 5,
  },
  {
    name: 'Moussa Fall',
    role: 'Client professionnel',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    text: 'Je confie tous mes costumes à Ben’s Pressing. Un résultat irréprochable et une livraison toujours à l’heure.',
    rating: 5,
  },
  {
    name: 'Ndeye Ba',
    role: 'Maman organisée',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&q=80',
    text: 'Le Pack Famille est parfait pour nous. Le pressing premium accessible, mes enfants sont toujours bien habillés.',
    rating: 5,
  },
  {
    name: 'Oumar Sall',
    role: 'Chef d\'entreprise',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80',
    text: 'Un service client réactif et professionnel. Je recommande vivement pour les costumes et tenues de cérémonie.',
    rating: 5,
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

export default function Testimonials() {
  return (
    <AnimatedSection>
      <section className="section">
        <div className="containerx">
          <SectionHeader
            eyebrow="Témoignages"
            title="Ce que disent nos clients"
            text="La satisfaction de nos clients est notre plus belle récompense."
          />
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="grid md:grid-cols-2 gap-6"
          >
            {testimonials.map((t) => (
              <motion.div key={t.name} variants={cardVariants} className="glass rounded-3xl p-8 group hover:bg-white/[0.03] transition-all duration-500">
                <div className="flex gap-1 mb-5">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} size={18} className="text-gold fill-gold" />
                  ))}
                </div>
                <p className="text-zinc-300 leading-8 text-lg italic">"{t.text}"</p>
                <div className="flex items-center gap-4 mt-6">
                  <img src={t.avatar} alt={t.name} className="w-12 h-12 rounded-full object-cover border border-gold/30" />
                  <div>
                    <p className="font-bold">{t.name}</p>
                    <p className="text-zinc-400 text-sm">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </AnimatedSection>
  );
}

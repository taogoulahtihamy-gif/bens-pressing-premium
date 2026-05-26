import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import SectionHeader from './SectionHeader';
import AnimatedSection from './AnimatedSection';

const images = [
  { src: 'https://images.unsplash.com/photo-1604335399105-a0c585fd81a1?auto=format&fit=crop&w=800&q=80', alt: 'Nettoyage pressing premium', cat: 'Pressing' },
  { src: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=800&q=80', alt: 'Chemises élégantes', cat: 'Vêtements' },
  { src: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80', alt: 'Costume sur mesure', cat: 'Costumes' },
  { src: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=800&q=80', alt: 'Robe de soirée élégante', cat: 'Robes' },
  { src: 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=800&q=80', alt: 'Linge maison luxe', cat: 'Linge maison' },
  { src: 'https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?auto=format&fit=crop&w=800&q=80', alt: 'Repassage professionnel', cat: 'Pressing' },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: 'easeOut' } },
};

export default function Gallery() {
  const [selected, setSelected] = useState(null);

  return (
    <AnimatedSection>
      <section className="section">
        <div className="containerx">
          <SectionHeader
            eyebrow="Galerie"
            title="Notre travail en images"
            text="Chaque pièce traitée avec expertise et passion."
          />
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="grid grid-cols-2 md:grid-cols-3 gap-4"
          >
            {images.map((img, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                onClick={() => setSelected(img)}
                className="relative group cursor-pointer rounded-2xl overflow-hidden aspect-square"
              >
                <img src={img.src} alt={img.alt} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-5">
                  <p className="text-gold font-bold text-sm uppercase tracking-wider">{img.cat}</p>
                  <p className="text-white text-lg font-semibold">{img.alt}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {selected && (
          <div className="fixed inset-0 z-[60] bg-black/85 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setSelected(null)}>
            <button onClick={() => setSelected(null)} className="absolute top-6 right-6 text-white/70 hover:text-white transition">
              <X size={32} />
            </button>
            <motion.img
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.85 }}
              src={selected.src}
              alt={selected.alt}
              className="max-w-full max-h-[85vh] rounded-2xl shadow-2xl border border-gold/20"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        )}
      </section>
    </AnimatedSection>
  );
}

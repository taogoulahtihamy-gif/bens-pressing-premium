import React, { useState, useEffect } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const WHATSAPP_NUMBER = '221774626760';
const PRE_FILLED_MESSAGE = 'Bonjour Ben\'s Pressing ! Je souhaite avoir plus d\'informations sur vos services premium.';

export default function FloatingWhatsApp() {
  const [scrolled, setScrolled] = useState(false);
  const [showTooltip, setShowTooltip] = useState(true);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 300);
    window.addEventListener('scroll', onScroll);
    const timer = setTimeout(() => setShowTooltip(false), 8000);
    return () => {
      window.removeEventListener('scroll', onScroll);
      clearTimeout(timer);
    };
  }, []);

  const openWhatsApp = () => {
    setShowTooltip(false);
    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(PRE_FILLED_MESSAGE)}`,
      '_blank',
      'noopener,noreferrer'
    );
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      <AnimatePresence>
        {showTooltip && !scrolled && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            className="glass rounded-2xl px-5 py-3 text-sm whitespace-nowrap relative"
          >
            <button onClick={() => setShowTooltip(false)} className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-zinc-800 text-zinc-400 grid place-items-center text-xs border border-gold/20"><X size={12} /></button>
            Besoin d'aide ? Écrivez-nous !
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={openWhatsApp}
        className="relative w-16 h-16 rounded-full bg-[#25D366] text-white shadow-2xl grid place-items-center hover:scale-105 transition"
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
      >
        <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-25" />
        <span className="absolute inset-0 rounded-full bg-[#25D366]" />
        <MessageCircle size={28} className="relative z-10" />
      </motion.button>
    </div>
  );
}

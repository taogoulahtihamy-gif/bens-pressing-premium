import React, { useState } from 'react';
import SectionHeader from '../components/SectionHeader';

const API_URL = import.meta.env.VITE_API_URL || 'https://bens-pressing-premium.onrender.com';

const statusSteps = ['Commande reçue', 'Collecte programmée', 'En traitement', 'Prêt', 'Livré'];

const statusIndex = {
  pending: 0,
  confirmed: 1,
  processing: 2,
  ready: 3,
  delivered: 4,
};

const statusDescriptions = {
  pending: 'Votre commande a bien été reçue et est en attente de confirmation.',
  confirmed: 'Votre créneau de collecte a été programmé.',
  processing: 'Votre linge est en cours de nettoyage.',
  ready: 'Votre commande est prête et vous attend.',
  delivered: 'Votre commande a été livrée avec succès.',
};

export default function Tracking() {
  const [trackingCode, setTrackingCode] = useState('');
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    if (!trackingCode.trim()) return;
    setLoading(true);
    setError(null);
    setOrder(null);
    try {
      const res = await fetch(`${API_URL}/api/orders/track/${trackingCode.trim()}`);
      const data = await res.json();
      if (data.success) {
        setOrder(data.order);
      } else {
        setError(data.message || 'Commande introuvable. Vérifiez votre code de suivi.');
      }
    } catch {
      setError('Commande introuvable. Vérifiez votre code de suivi.');
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSearch();
  };

  const currentStep = order ? (statusIndex[order.status] ?? -1) : -1;

  return (
    <section className="section">
      <div className="containerx">
        <SectionHeader
          eyebrow="Suivi"
          title="Suivez votre commande"
          text="Entrez votre code de commande pour connaître l'avancement de votre pressing."
        />
        <div className="glass rounded-[2rem] p-8 md:p-12 max-w-4xl mx-auto">
          <div className="flex flex-col sm:flex-row gap-4">
            <input
              placeholder="Ex : BEN-123456"
              value={trackingCode}
              onChange={(e) => setTrackingCode(e.target.value)}
              onKeyDown={handleKeyDown}
              className="w-full"
            />
            <button className="btn-gold whitespace-nowrap" onClick={handleSearch} disabled={loading}>
              {loading ? 'Recherche...' : 'Rechercher'}
            </button>
          </div>

          {error && (
            <div className="mt-8 glass rounded-2xl p-6 border border-red-500/20 text-center">
              <p className="text-red-400 text-lg">{error}</p>
            </div>
          )}

          {order && (
            <div className="mt-8 glass rounded-2xl p-6 border border-gold/20">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                <div>
                  <p className="text-zinc-400 text-sm">Code de suivi</p>
                  <p className="text-gold font-mono text-2xl font-bold">{order.trackingCode}</p>
                </div>
                <div>
                  <p className="text-zinc-400 text-sm">Client</p>
                  <p className="text-white font-bold text-xl">{order.fullName}</p>
                </div>
                <div>
                  <p className="text-zinc-400 text-sm">Prestation</p>
                  <p className="text-white font-bold">{order.service}</p>
                </div>
              </div>

              <div className="mt-10 space-y-6">
                {statusSteps.map((label, i) => (
                  <div key={label} className="flex gap-5 items-center">
                    <div
                      className={`w-12 h-12 rounded-full grid place-items-center font-bold shrink-0 ${
                        i <= currentStep
                          ? 'bg-gold text-black'
                          : 'border border-gold/30 text-gold'
                      }`}
                    >
                      {i + 1}
                    </div>
                    <div>
                      <h3 className="font-bold text-xl">{label}</h3>
                      <p className="text-zinc-400">
                        {i === currentStep
                          ? statusDescriptions[order.status]
                          : i < currentStep
                            ? 'Terminé'
                            : 'En attente'}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

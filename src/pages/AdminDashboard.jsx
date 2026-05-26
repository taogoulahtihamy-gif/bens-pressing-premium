import React, { useState, useEffect } from 'react';
import SectionHeader from '../components/SectionHeader';
import { Banknote, Clock, PackageCheck, Truck, Trash2 } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const statusLabels = {
  pending: 'En attente',
  confirmed: 'Confirmée',
  processing: 'En traitement',
  ready: 'Prête',
  delivered: 'Livrée',
};

const statusColors = {
  pending: 'bg-yellow-500/10 text-yellow-400',
  confirmed: 'bg-blue-500/10 text-blue-400',
  processing: 'bg-gold/10 text-gold',
  ready: 'bg-green-500/10 text-green-400',
  delivered: 'bg-zinc-500/10 text-zinc-400',
};

export default function AdminDashboard() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchOrders = async () => {
    try {
      const res = await fetch(`${API_URL}/api/orders`);
      if (!res.ok) throw new Error('Erreur chargement');
      const data = await res.json();
      setOrders(data);
      setError(null);
    } catch (err) {
      setError('Impossible de charger les commandes. Vérifiez que le backend tourne sur le port 5000.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchOrders() }, []);

  const updateStatus = async (id, newStatus) => {
    try {
      await fetch(`${API_URL}/api/orders/${id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      fetchOrders();
    } catch (err) {
      alert('Erreur lors du changement de statut');
    }
  };

  const deleteOrder = async (id) => {
    if (!window.confirm('Supprimer cette commande ?')) return;
    try {
      await fetch(`${API_URL}/api/orders/${id}`, { method: 'DELETE' });
      fetchOrders();
    } catch (err) {
      alert('Erreur lors de la suppression');
    }
  };

  const totalEnAttente = orders.filter(o => o.status === 'pending').length;
  const totalPretes = orders.filter(o => o.status === 'ready').length;
  const totalLivrees = orders.filter(o => o.status === 'delivered').length;
  const totalCommandes = orders.length;

  if (loading) {
    return (
      <section className="section">
        <div className="containerx text-center">
          <p className="text-zinc-400 text-lg">Chargement des commandes...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="section">
      <div className="containerx">
        <SectionHeader
          eyebrow="Dashboard"
          title="Gestion Ben's Pressing"
          text="Suivez et gérez toutes les commandes en temps réel."
        />

        {error && (
          <div className="glass rounded-2xl p-6 mb-8 border-red-500/20">
            <p className="text-red-400">{error}</p>
            <button onClick={fetchOrders} className="btn-gold mt-4 inline-flex">Réessayer</button>
          </div>
        )}

        <div className="grid md:grid-cols-4 gap-5 mb-10">
          <div className="glass rounded-3xl p-7 flex items-center gap-5">
            <Banknote size={34} className="text-gold" />
            <div>
              <p className="text-3xl font-black">{totalCommandes}</p>
              <p className="text-zinc-400">Total commandes</p>
            </div>
          </div>
          <div className="glass rounded-3xl p-7 flex items-center gap-5">
            <Clock size={34} className="text-yellow-400" />
            <div>
              <p className="text-3xl font-black">{totalEnAttente}</p>
              <p className="text-zinc-400">En attente</p>
            </div>
          </div>
          <div className="glass rounded-3xl p-7 flex items-center gap-5">
            <PackageCheck size={34} className="text-green-400" />
            <div>
              <p className="text-3xl font-black">{totalPretes}</p>
              <p className="text-zinc-400">Prêtes</p>
            </div>
          </div>
          <div className="glass rounded-3xl p-7 flex items-center gap-5">
            <Truck size={34} className="text-blue-400" />
            <div>
              <p className="text-3xl font-black">{totalLivrees}</p>
              <p className="text-zinc-400">Livrées</p>
            </div>
          </div>
        </div>

        <div className="glass rounded-[2rem] overflow-hidden">
          <div className="p-6 border-b border-white/10">
            <h3 className="font-serif text-3xl">Commandes récentes</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="text-gold text-sm">
                <tr>
                  <th className="p-5">Code</th>
                  <th>Client</th>
                  <th className="hidden md:table-cell">Téléphone</th>
                  <th>Prestation</th>
                  <th>Date</th>
                  <th>Statut</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="p-10 text-center text-zinc-500">
                      Aucune commande pour le moment.
                    </td>
                  </tr>
                ) : (
                  orders.map((order) => (
                    <tr key={order.id} className="border-t border-white/10 hover:bg-white/[0.02] transition">
                      <td className="p-5 font-mono text-gold text-sm">{order.trackingCode}</td>
                      <td className="text-zinc-200 font-medium">{order.fullName}</td>
                      <td className="hidden md:table-cell text-zinc-400">{order.phone}</td>
                      <td className="text-zinc-300">{order.service}</td>
                      <td className="text-zinc-400 text-sm">{order.pickupDate}</td>
                      <td>
                        <select
                          value={order.status}
                          onChange={(e) => updateStatus(order.id, e.target.value)}
                          className={`px-3 py-1 rounded-full text-sm font-bold border-0 cursor-pointer ${statusColors[order.status] || 'bg-gold/10 text-gold'}`}
                        >
                          {Object.entries(statusLabels).map(([val, label]) => (
                            <option key={val} value={val}>{label}</option>
                          ))}
                        </select>
                      </td>
                      <td>
                        <button
                          onClick={() => deleteOrder(order.id)}
                          className="p-2 text-red-400 hover:text-red-300 transition"
                          title="Supprimer"
                        >
                          <Trash2 size={18} />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}

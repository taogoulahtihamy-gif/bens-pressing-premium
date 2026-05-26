import React, { useState } from 'react';
import SectionHeader from '../components/SectionHeader';
import { pricing } from '../data/pricing';

const WHATSAPP_NUMBER = '221774626760';

const services = ['Nettoyage à sec', 'Repassage premium', 'Lavage express', 'Retouches', 'Linge maison'];
const times = ['8h - 10h', '10h - 12h', '14h - 16h', '16h - 18h'];

export default function Booking() {
  const allItems = pricing.flatMap((category) => category.items.map((item) => `${item.name} — ${item.price}`));
  const [form, setForm] = useState({
    fullName: '',
    phone: '',
    address: '',
    service: services[0],
    clothes: allItems[0] || '',
    pickupDate: '',
    pickupTime: times[0],
    delivery: 'Standard - 1 000 FCFA',
    instructions: '',
  });

  const update = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const sendToWhatsApp = (event) => {
    event.preventDefault();

    if (!form.fullName || !form.phone || !form.address || !form.pickupDate) {
      alert('Veuillez remplir le nom, le téléphone, l’adresse et la date de collecte.');
      return;
    }

    const message = `Bonjour Ben's Pressing, je souhaite faire une commande.%0A%0A` +
      `Nom : ${form.fullName}%0A` +
      `Téléphone : ${form.phone}%0A` +
      `Adresse : ${form.address}%0A` +
      `Service : ${form.service}%0A` +
      `Prestation : ${form.clothes}%0A` +
      `Date de collecte : ${form.pickupDate}%0A` +
      `Créneau : ${form.pickupTime}%0A` +
      `Livraison : ${form.delivery}%0A` +
      `Instructions : ${form.instructions || 'Aucune'}%0A%0A` +
      `Merci de confirmer ma réservation.`;

    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <section className="section">
      <div className="containerx">
        <SectionHeader
          eyebrow="Réservation WhatsApp"
          title="Commandez en quelques secondes"
          text="Remplissez le formulaire. En cliquant sur confirmer, WhatsApp s’ouvre avec un message déjà préparé pour Ben’s Pressing."
        />

        <div className="grid lg:grid-cols-[1.1fr_.9fr] gap-8 max-w-6xl mx-auto items-stretch">
          <form onSubmit={sendToWhatsApp} className="glass rounded-[2rem] p-8 md:p-12 grid md:grid-cols-2 gap-6">
            <input name="fullName" value={form.fullName} onChange={update} placeholder="Nom complet" />
            <input name="phone" value={form.phone} onChange={update} placeholder="Téléphone" />
            <input name="address" value={form.address} onChange={update} className="md:col-span-2" placeholder="Adresse de collecte" />

            <select name="service" value={form.service} onChange={update}>
              {services.map((service) => <option key={service}>{service}</option>)}
            </select>

            <select name="clothes" value={form.clothes} onChange={update}>
              {allItems.map((item) => <option key={item}>{item}</option>)}
            </select>

            <input name="pickupDate" value={form.pickupDate} onChange={update} type="date" />

            <select name="pickupTime" value={form.pickupTime} onChange={update}>
              {times.map((time) => <option key={time}>{time}</option>)}
            </select>

            <select name="delivery" value={form.delivery} onChange={update} className="md:col-span-2">
              <option>Standard - 1 000 FCFA</option>
              <option>Express - 2 000 FCFA</option>
              <option>Sans livraison</option>
            </select>

            <textarea
              name="instructions"
              value={form.instructions}
              onChange={update}
              className="md:col-span-2 min-h-32"
              placeholder="Instructions particulières : taches, urgence, type de tissu, nombre de pièces..."
            />

            <button type="submit" className="btn-gold md:col-span-2">
              Confirmer la réservation sur WhatsApp
            </button>
          </form>

          <div className="glass rounded-[2rem] overflow-hidden min-h-[520px] bg-[url('https://images.unsplash.com/photo-1545173168-9f1947eebb7f?auto=format&fit=crop&w=1200&q=80')] bg-cover bg-center relative">
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
            <div className="absolute bottom-0 p-8 md:p-10">
              <p className="text-gold uppercase tracking-[.35em] text-xs font-black mb-4">Service direct</p>
              <h3 className="font-serif text-4xl md:text-5xl leading-tight">Votre commande part directement sur WhatsApp.</h3>
              <p className="text-zinc-300 leading-8 mt-5">Le pressing reçoit toutes les informations : nom, téléphone, adresse, prestation, date et créneau.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

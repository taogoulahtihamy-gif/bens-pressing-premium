import React from 'react';
import SectionHeader from '../components/SectionHeader';
export default function AdminLogin(){return <section className="section"><div className="containerx"><SectionHeader eyebrow="Admin" title="Connexion administrateur"/><form className="glass rounded-[2rem] p-8 md:p-12 max-w-md mx-auto grid gap-5"><input placeholder="Email admin"/><input type="password" placeholder="Mot de passe"/><button type="button" className="btn-gold">Connexion</button></form></div></section>}

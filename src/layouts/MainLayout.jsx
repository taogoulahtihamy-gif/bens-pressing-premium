import React from 'react';
import Navbar from '../components/Navbar';import Footer from '../components/Footer';import FloatingWhatsApp from '../components/FloatingWhatsApp';
export default function MainLayout({children}){return <div className="min-h-screen flex flex-col bg-ink"><Navbar/><main className="flex-1">{children}</main><Footer/><FloatingWhatsApp/></div>}

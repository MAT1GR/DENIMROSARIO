import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Instagram, Loader2, Check } from "lucide-react";
import logo from "../assets/LOGO.webp";

const Footer: React.FC = () => {
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const helpLinks = [
    { href: "/cambios-y-devoluciones", label: "Envíos y Devoluciones" },
  ];

  const legalLinks = [
    { href: "/privacy-policy", label: "Políticas de Privacidad" },
  ];

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone) return;
    
    setLoading(true);
    try {
      const response = await fetch('/api/notifications/drop', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone }), // Name will default to 'Suscriptor' in backend
      });
      
      if (response.ok) {
        setSuccess(true);
        setPhone("");
        setTimeout(() => setSuccess(false), 3000);
      } else {
        alert("Hubo un error al suscribirte. Intenta nuevamente.");
      }
    } catch (error) {
      console.error("Error subscribing:", error);
      alert("Error de conexión.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="bg-gris-oscuro text-blanco-hueso">
      <div className="container mx-auto max-w-7xl px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo y Descripción */}
          <div className="md:col-span-1">
            <Link to="/">
              <img 
                src={logo} 
                alt="Denim Rosario" 
                className="h-12 w-auto object-contain mb-4"
              />
            </Link>
            <p className="mt-4 text-sm opacity-80">
              Redefiniendo el denim con un calce perfecto y un estilo que
              perdura.
            </p>
          </div>

          {/* Ayuda */}
          <div>
            <h3 className="font-semibold tracking-wider uppercase opacity-90">Ayuda</h3>
            <ul className="mt-4 space-y-2">
              {helpLinks.map((link) => (
                <li key={link.href}>
                  <Link to={link.href} className="opacity-70 hover:opacity-100 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold tracking-wider uppercase opacity-90">Legal</h3>
            <ul className="mt-4 space-y-2">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link to={link.href} className="opacity-70 hover:opacity-100 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div className="text-left md:text-right">
            <h3 className="font-semibold tracking-wider uppercase opacity-90">Social</h3>
            <div className="flex mt-4 space-x-4 md:justify-end">
              <a href="https://www.instagram.com/denimrosario/" className="opacity-70 hover:opacity-100 transition-colors"><Instagram size={20} /></a>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-white/10 text-center text-sm opacity-50">
          <p>&copy; {new Date().getFullYear()} DenimRosario. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

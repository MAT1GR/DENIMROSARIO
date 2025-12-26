import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Instagram, Loader2, Check } from "lucide-react";

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
    <footer className="bg-black text-white">
      <div className="container mx-auto max-w-7xl px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo y Descripción */}
          <div className="md:col-span-1">
            <Link
              to="/"
              className="font-poppins text-xl font-bold tracking-widest uppercase"
            >
              <span className="font-semibold text-white">denim</span>
              <span className="font-light text-gray-400">rosario</span>
            </Link>
            <p className="mt-4 text-sm text-gray-400">
              Redefiniendo el denim con un calce perfecto y un estilo que
              perdura.
            </p>
          </div>

          {/* Ayuda */}
          <div>
            <h3 className="font-semibold tracking-wider uppercase text-gray-300">Ayuda</h3>
            <ul className="mt-4 space-y-2">
              {helpLinks.map((link) => (
                <li key={link.href}>
                  <Link to={link.href} className="text-gray-400 hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold tracking-wider uppercase text-gray-300">Legal</h3>
            <ul className="mt-4 space-y-2">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link to={link.href} className="text-gray-400 hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter & Social */}
          <div className="text-left md:text-right">
            <h3 className="font-semibold tracking-wider uppercase text-gray-300">Newsletter</h3>
            <p className="text-xs text-gray-500 mt-2 mb-4">Unite a nuestra lista de difusión en WhatsApp.</p>
            
            <form onSubmit={handleSubscribe} className="flex flex-col gap-2 items-start md:items-end">
               <input 
                 type="tel" 
                 placeholder="Tu WhatsApp" 
                 className="bg-gray-900 text-white border border-gray-700 rounded px-3 py-2 text-sm w-full md:w-auto focus:outline-none focus:border-white placeholder:text-gray-600 transition-colors"
                 value={phone}
                 onChange={(e) => setPhone(e.target.value)}
                 required
               />
               <button 
                type="submit" 
                disabled={loading || success}
                className={`px-4 py-2 rounded text-sm font-bold uppercase tracking-wider transition-all w-full md:w-auto flex items-center justify-center gap-2 ${success ? 'bg-green-500 text-white' : 'bg-white text-black hover:bg-gray-200'}`}
               >
                 {loading ? <Loader2 size={16} className="animate-spin" /> : success ? <><Check size={16}/> Suscripto</> : 'Suscribirme'}
               </button>
            </form>

            <h3 className="font-semibold tracking-wider uppercase text-gray-300 mt-8">Social</h3>
            <div className="flex mt-4 space-x-4 md:justify-end">
              <a href="https://www.instagram.com/denimrosario/" className="text-gray-400 hover:text-white transition-colors"><Instagram size={20} /></a>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-gray-800 text-center text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} DenimRosario. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

import React, { useEffect, useState } from "react";
import { useLocation, useParams, useNavigate, Link } from "react-router-dom";
import { Copy, Check, AlertTriangle, Loader } from "lucide-react";
import { Order } from "../types";
import { useCart } from "../hooks/useCart";
import { StockCountdownTimer } from "../components/StockCountdownTimer";
import { useSettings } from "../hooks/useSettings"; // Import the new hook
import whatsappLogo from "../assets/whatsapp-logo.png"; // Import WhatsApp logo

const TransferPendingPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const { clearCart } = useCart();
  const { settings, loading: settingsLoading } = useSettings(); // Use the settings hook

  const [order, setOrder] = useState<Order | null>(
    location.state?.order || null
  );
  const [loading, setLoading] = useState(!location.state?.order);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState<string | null>(null);

  useEffect(() => {
    clearCart();
  }, [clearCart]);

  useEffect(() => {
    if (!order && id) {
      const fetchOrder = async () => {
        try {
          const response = await fetch(`/api/orders/${id}`);
          if (!response.ok) {
            throw new Error("No se pudo encontrar la orden.");
          }
          const data = await response.json();
          setOrder(data);
        } catch (err: any) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };
      fetchOrder();
    }
  }, [id, order]);

  useEffect(() => {
    if (!loading && !order) {
      navigate("/");
    }
  }, [loading, order, navigate]);

  const handleCopy = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopied(field);
    setTimeout(() => setCopied(null), 2000);
  };

  if (loading || settingsLoading) {
    return (
      <div className="flex flex-col justify-center items-center h-screen">
          <Loader className="animate-spin mb-4" />
          Cargando...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col justify-center items-center h-screen text-center">
        <AlertTriangle className="text-red-500 mb-4" size={48} />
        <h1 className="text-2xl font-bold mb-2">Error</h1>
        <p className="text-gray-600 mb-4">{error}</p>
        <Link to="/" className="text-blue-500 hover:underline">Volver al inicio</Link>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="flex justify-center items-center h-screen">Verificando datos de la orden...</div>
    );
  }

  const bankDetails = {
    cvu: settings.transfer_cvu || 'No disponible',
    alias: settings.transfer_alias || 'No disponible',
    titular: settings.transfer_titular || 'No disponible',
  };
  
  const mainWhatsAppNumber = settings.contact_whatsapp || '543413981584';
  const secondaryWhatsAppNumber = '543541374915'; // Assuming this one remains static or you can add another setting for it

  const whatsappMessage = `¡Hola! Acabo de hacer el pedido #${order.id} y quiero enviar mi comprobante de pago.`;
  const whatsappLink = `https://wa.me/${mainWhatsAppNumber}?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <div className="min-h-screen bg-blanco-hueso py-12">
      <div className="container mx-auto max-w-lg px-4 text-center">
        <div className="bg-white p-8 rounded-lg shadow-md border border-arena">
          <h1 className="text-3xl md:text-4xl font-black text-red-600 mb-2 uppercase tracking-wide">¡Tu jean está a salvo!</h1>
          <h2 className="text-xl md:text-2xl font-bold mb-6 text-gris-oscuro">¡Pero apúrate, el tiempo corre!</h2>
          <p className="text-gris-oscuro/80 mb-8">Para confirmar tu compra, realiza la transferencia con los datos de abajo y envíanos el comprobante por WhatsApp para que podamos procesar tu envío.</p>
          
          <StockCountdownTimer createdAt={order.createdAt} orderId={order.id} className="mb-10 text-4xl md:text-5xl font-black text-red-600 animate-pulse" />

          <div className="bg-blanco-hueso border border-arena rounded-lg p-6 text-left space-y-4 mb-8">
            <h2 className="font-bold text-lg text-gris-oscuro text-center">Datos para la Transferencia</h2>
            {/* ... other bank details rendering ... */}
          </div>

          <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="w-full bg-green-500 text-white py-4 md:py-5 text-lg rounded-lg font-black hover:bg-green-600 transition-colors flex items-center justify-center gap-3 shadow-lg hover:shadow-xl">
            <img src={whatsappLogo} alt="WhatsApp" className="w-6 h-6 md:w-8 md:h-8" />
            ENVIAR COMPROBANTE POR WHATSAPP
          </a>
          <div className="mt-4">
            <p className="text-sm text-gray-600">Por si las dudas también podes contactarnos al:</p>
            <div className="text-sm font-semibold mt-1">
              <a href={`tel:+${mainWhatsAppNumber}`} className="text-blue-600 hover:underline">+{mainWhatsAppNumber}</a>
              <span className="mx-2 text-gray-600">o</span>
              <a href={`tel:+${secondaryWhatsAppNumber}`} className="text-blue-600 hover:underline">+{secondaryWhatsAppNumber}</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransferPendingPage;
import React from 'react';
import WhatsAppLogo from '../assets/whatsapp-logo.png';
import { useSettings } from '../hooks/useSettings';

const WhatsAppButton: React.FC<{ message?: string }> = ({ message: propMessage }) => {
  const { settings } = useSettings();
  const phoneNumber = settings.contact_whatsapp || '543541374915'; // Fallback to old number
  const defaultMessage = ''; // No default message
  const finalMessage = propMessage || defaultMessage;

  const whatsappUrl = finalMessage
    ? `https://wa.me/${phoneNumber}?text=${encodeURIComponent(finalMessage)}`
    : `https://wa.me/${phoneNumber}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition-transform hover:scale-110 z-50 flex items-center justify-center"
      aria-label="Contactar por WhatsApp"
    >
      <img src={WhatsAppLogo} alt="WhatsApp Logo" style={{ height: '28px', width: '28px' }} />
    </a>
  );
};

export default WhatsAppButton;
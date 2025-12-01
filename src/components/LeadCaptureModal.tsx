import React, { useState } from 'react';
import { Mail, X } from 'lucide-react';
import Portal from './Portal'; // Import the Portal component

interface LeadCaptureModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubscribe: (email: string) => void;
}

const LeadCaptureModal: React.FC<LeadCaptureModalProps> = ({ isOpen, onClose, onSubscribe }) => {
  const [email, setEmail] = useState('');

  if (!isOpen) {
    return null;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      onSubscribe(email);
    }
  };

  return (
    <Portal>
      <div 
        className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4"
        onClick={onClose}
      >
        <div 
          className="bg-white rounded-lg shadow-2xl p-8 max-w-sm w-full relative"
          onClick={(e) => e.stopPropagation()}
        >
          <button 
            onClick={onClose}
            className="absolute top-2 right-2 text-gray-400 hover:text-gray-800 transition-colors"
            aria-label="Cerrar"
          >
            <X size={24} />
          </button>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-gray-800 text-white mx-auto rounded-full flex items-center justify-center mb-4">
              <Mail size={32} />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">¡No te quedes afuera!</h2>
            <p className="text-gray-600 mb-6">
              Los drops son limitados y se agotan rápido. Dejanos tu email y sé la primera en enterarte de los nuevos lanzamientos.
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Tu correo electrónico"
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-800 transition-shadow"
                required
              />
              <button 
                type="submit"
                className="w-full bg-gray-800 text-white font-bold py-3 px-4 rounded-md hover:bg-gray-900 transition-colors"
              >
                AVISARME
              </button>
            </div>
          </form>
        </div>
      </div>
    </Portal>
  );
};

export default LeadCaptureModal;

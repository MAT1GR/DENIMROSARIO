import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';

interface PortalProps {
  children: React.ReactNode;
}

const Portal: React.FC<PortalProps> = ({ children }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  if (!mounted) {
    return null;
  }

  const modalRoot = document.getElementById('modal-root');
  if (!modalRoot) {
    // If the root doesn't exist, create it.
    const newRoot = document.createElement('div');
    newRoot.id = 'modal-root';
    document.body.appendChild(newRoot);
    return createPortal(children, newRoot);
  }

  return createPortal(children, modalRoot);
};

export default Portal;

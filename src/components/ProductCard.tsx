import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../../server/types';

interface ProductCardProps {
  product: Product;
  theme?: 'light' | 'dark';
}

const ProductCard: React.FC<ProductCardProps> = ({ product, theme = 'light' }) => {
  const getCorrectImageUrl = (path: string) => {
    if (!path) return '';
    if (path.startsWith('/uploads/')) return `/api${path}`;
    return path;
  };

  const imageUrl = (product.images && product.images.length > 0)
    ? getCorrectImageUrl(product.images[0])
    : 'https://via.placeholder.com/400x500';

  const secondImageUrl = (product.images && product.images.length > 1)
    ? getCorrectImageUrl(product.images[1])
    : '';

  const textColor = theme === 'dark' ? 'text-white' : 'text-black';
  
  const totalStock = Object.values(product.sizes || {}).reduce((acc, s) => acc + (s.stock || 0), 0);
  const isSoldOut = totalStock === 0;

  const installmentPrice = (product.price / 3).toLocaleString('es-AR', { maximumFractionDigits: 0 });

  return (
    <Link to={`/producto/${product.id}`} className={`group block relative ${textColor}`}>
      
      {/* 1. IMAGEN LIMPIA */}
      <div className="bg-white relative rounded-[4px] overflow-hidden shadow-sm group-hover:shadow-md transition-all duration-300">
        <div className="relative aspect-[3/4]">
          <img
            src={imageUrl}
            alt={`Jean ${product.name}`}
            className={`w-full h-full object-cover transition-opacity duration-500 ${isSoldOut ? 'grayscale opacity-60' : ''} ${secondImageUrl ? 'group-hover:opacity-0' : ''}`}
            loading="lazy"
          />
          {secondImageUrl && !isSoldOut && (
            <img
              src={secondImageUrl}
              alt={`Jean ${product.name} vista trasera`}
              className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              loading="lazy"
            />
          )}
          {isSoldOut && (
             <div className="absolute inset-0 flex items-center justify-center">
                <span className="bg-white/90 text-black text-xs font-bold px-3 py-1 uppercase tracking-widest border border-gray-200">
                    Sin Stock
                </span>
             </div>
          )}
        </div>
      </div>

      {/* 2. INFO DEBAJO */}
      <div className="pt-4 px-1 text-left">
        
        {/* A. NOMBRE (Principal) */}
        <h3 className="text-base font-black text-gray-900 uppercase tracking-tight leading-tight mb-2 group-hover:underline decoration-1 underline-offset-4">
          {product.name}
        </h3>
        
        {/* B. PRECIO + ENVÍO (Centrados verticalmente) */}
        <div className="flex items-center gap-2 mb-1">
          <p className="text-lg font-bold text-gray-900 leading-none">
            ${product.price.toLocaleString('es-AR')}
          </p>
          {!isSoldOut && (
            <span className="bg-green-50 text-green-700 text-[10px] font-black uppercase tracking-wide px-1.5 py-0.5 rounded">
              + Envío Gratis
            </span>
          )}
        </div>

        {/* C. CUOTAS */}
        <p className="text-xs text-gray-500 font-medium">
            3 cuotas de <span className="text-black font-bold">${installmentPrice}</span>
        </p>

      </div>
    </Link>
  );
};

export default ProductCard;
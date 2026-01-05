import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Product } from '../types';
import ProductCard from '../components/ProductCard';
import SkeletonCard from '../components/SkeletonCard'; // Importar el nuevo componente
import { useScrollAnimation } from '../hooks/useScrollAnimation';

type SortOption = 'newest' | 'price-asc' | 'price-desc' | 'popular';

const ShopPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const [filters, setFilters] = useState({
    sortBy: 'newest' as SortOption,
    page: 1,
  });

  const productsRef = useScrollAnimation();

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      const params = new URLSearchParams({
        page: String(filters.page),
        sortBy: filters.sortBy,
      });

      try {
        // Simular un poco de retraso para ver el skeleton
        await new Promise(res => setTimeout(res, 500)); 
        const response = await fetch(`/api/products?${params.toString()}`);
        const data = await response.json();
        setProducts(data.products);
        setTotalPages(data.totalPages);
        setTotalProducts(data.totalProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, [filters]);

  const handleFilterChange = (key: keyof typeof filters, value: string | number) => {
    setFilters(prev => ({ ...prev, [key]: value, page: 1 }));
  };

  return (
    <div className="min-h-screen bg-blanco-hueso py-8 text-gris-oscuro">
      <div className="container mx-auto px-4 max-w-7xl">
          <main ref={productsRef} className="w-full scroll-animate">
            <div className="flex flex-col sm:flex-row justify-between items-center mb-10 gap-4">
              <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-tighter">
                Tienda <span className="text-sm font-normal opacity-40 ml-2">({totalProducts} productos)</span>
              </h1>
              <select
                value={filters.sortBy}
                onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                className="px-4 py-2 border border-gris-oscuro/20 rounded-sm focus:outline-none focus:ring-1 focus:ring-gris-oscuro w-full sm:w-auto bg-blanco-hueso uppercase text-xs font-bold tracking-widest"
              >
                <option value="newest">Novedades</option>
                <option value="popular">Más Populares</option>
                <option value="price-asc">Precio: Menor a Mayor</option>
                <option value="price-desc">Precio: Mayor a Menor de Mayor</option>
              </select>
            </div>

            {isLoading ? (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)}
                </div>
            ) : products.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {products.map(product => <ProductCard key={product.id} product={product} />)}
                </div>
            ) : (
                <div className="text-center py-16"><p className="text-xl opacity-60">No se encontraron productos.</p></div>
            )}

            {totalPages > 1 && (
                <div className="flex justify-center items-center mt-12 gap-4">
                    <button onClick={() => handleFilterChange('page', filters.page - 1)} disabled={filters.page <= 1} className="p-2 disabled:opacity-30 transition-opacity hover:opacity-100"><ChevronLeft/></button>
                    <span className="text-sm font-medium">Página {filters.page} de {totalPages}</span>
                    <button onClick={() => handleFilterChange('page', filters.page + 1)} disabled={filters.page >= totalPages} className="p-2 disabled:opacity-30 transition-opacity hover:opacity-100"><ChevronRight/></button>
                </div>
            )}
          </main>
      </div>
    </div>
  );
};

export default ShopPage;

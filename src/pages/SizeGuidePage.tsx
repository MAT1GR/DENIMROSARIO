import React from "react";
import { Ruler, ArrowLeft, Heart, Scale } from "lucide-react";
import WhatsAppLogo from '../assets/whatsapp-logo.png';
import { Link } from "react-router-dom";
import { useScrollAnimation } from "../hooks/useScrollAnimation";

const SizeGuidePage: React.FC = () => {
  const contentRef = useScrollAnimation<HTMLDivElement>();

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div
        ref={contentRef}
        className="container mx-auto px-4 max-w-4xl scroll-animate"
      >
        <div className="bg-white rounded-lg shadow-sm p-8 md:p-12">
          <div className="text-center mb-12">
            <div className="bg-gray-800 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
              <Ruler className="text-white" size={32} />
            </div>
            <h1 className="text-4xl font-bold mb-4">¡Encontrá tu Talle Perfecto!</h1>
            {/* Removed the introductory paragraph as requested */}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
            <div>
              <h2 className="text-2xl font-bold mb-6">
                Medí tu Jean Favorito
              </h2>
              <p className="text-gray-600 text-sm mb-6">
                Para encontrar tu talle ideal, agarrá un jean que te encante cómo te queda, extendelo en una superficie plana y medí lo siguiente:
              </p>

              <div className="space-y-6">
                <div className="flex gap-4 items-start">
                  <div className="bg-gray-700 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">
                    1
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Cintura (A)</h3>
                    <p className="text-gray-600 text-sm">
                      Medí el contorno de la cintura del jean, de borde a borde. No estires la tela.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="bg-gray-700 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">
                    2
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Tiro Delantero (B)</h3>
                    <p className="text-gray-600 text-sm">
                      Medí desde la costura de la entrepierna hasta el botón de la cintura.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="bg-gray-700 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">
                    3
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Largo (C)</h3>
                    <p className="text-gray-600 text-sm">
                      Medí desde la costura de la entrepierna hasta abajo, a lo largo de la pierna.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-6">Tabla de Medidas (prenda en plano)</h2>

              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-300">
                  <thead>
                    <tr className="bg-gray-700 text-white">
                      <th className="border border-gray-300 p-2 text-left text-xs sm:text-sm">
                        Talle
                      </th>
                      <th className="border border-gray-300 p-2 text-left text-xs sm:text-sm">
                        Cintura (A)
                      </th>
                      <th className="border border-gray-300 p-2 text-left text-xs sm:text-sm">
                        Tiro (B)
                      </th>
                      <th className="border border-gray-300 p-2 text-left text-xs sm:text-sm">
                        Largo (C)
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="hover:bg-gray-50">
                      <td className="border border-gray-300 p-2 font-medium text-xs sm:text-sm">
                        36
                      </td>
                      <td className="border border-gray-300 p-2 text-xs sm:text-sm">36 cm</td>
                      <td className="border border-gray-300 p-2 text-xs sm:text-sm">28 cm</td>
                      <td className="border border-gray-300 p-2 text-xs sm:text-sm">70 cm</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="border border-gray-300 p-2 font-medium text-xs sm:text-sm">
                        38
                      </td>
                      <td className="border border-gray-300 p-2 text-xs sm:text-sm">38 cm</td>
                      <td className="border border-gray-300 p-2 text-xs sm:text-sm">29 cm</td>
                      <td className="border border-gray-300 p-2 text-xs sm:text-sm">71 cm</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="border border-gray-300 p-2 font-medium text-xs sm:text-sm">
                        40
                      </td>
                      <td className="border border-gray-300 p-2 text-xs sm:text-sm">40 cm</td>
                      <td className="border border-gray-300 p-2 text-xs sm:text-sm">30 cm</td>
                      <td className="border border-gray-300 p-2 text-xs sm:text-sm">72 cm</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="border border-gray-300 p-2 text-xs sm:text-sm">
                        42
                      </td>
                      <td className="border border-gray-300 p-2 text-xs sm:text-sm">42 cm</td>
                      <td className="border border-gray-300 p-2 text-xs sm:text-sm">31 cm</td>
                      <td className="border border-gray-300 p-2 text-xs sm:text-sm">73 cm</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="border border-gray-300 p-2 text-xs sm:text-sm">
                        44
                      </td>
                      <td className="border border-gray-300 p-2 text-xs sm:text-sm">44 cm</td>
                      <td className="border border-gray-300 p-2 text-xs sm:text-sm">32 cm</td>
                      <td className="border border-gray-300 p-2 text-xs sm:text-sm">74 cm</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="mt-6 p-4 bg-gray-100 border border-gray-200 rounded-lg">
                <p className="text-sm text-gray-700">
                  <Heart className="inline mr-2 text-gray-500" size={16} />
                  <strong>¡Dato importante!:</strong> Estas son medidas de la prenda, no de tu cuerpo. Comparalas con un jean que ya tengas y te quede perfecto.
                </p>
              </div>
            </div>
          </div>

          <div className="text-center bg-gray-100 p-8 rounded-lg mt-12">
            <h3 className="text-xl font-bold mb-4">¿Te quedó alguna duda?</h3>
            {/* Removed descriptive paragraph as requested */}
            <a
              href="https://wa.me/543541374915?text=Hola%20tengo%20una%20duda%20sobre%20el%20talle"
              className="inline-flex items-center justify-center bg-[#25D366] hover:bg-[#1DA851] text-white px-8 py-3 rounded-lg font-medium transition-colors"
            >
              <img src={WhatsAppLogo} alt="WhatsApp Logo" className="inline mr-2" style={{ height: '18px', width: '18px' }} /> WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SizeGuidePage;
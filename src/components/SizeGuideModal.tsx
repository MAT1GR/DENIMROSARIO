import React from "react";
import { X, Ruler } from "lucide-react";

interface SizeGuideModalProps {
  onClose: () => void;
}

const sizeData = [
  { size: "36", waist: "36 cm", rise: "28 cm" },
  { size: "38", waist: "38 cm", rise: "29 cm" },
  { size: "40", waist: "40 cm", rise: "30 cm" },
  { size: "42", waist: "42 cm", rise: "31 cm" },
  { size: "44", waist: "44 cm", rise: "32 cm" },
];

const SizeGuideModal: React.FC<SizeGuideModalProps> = ({ onClose }) => {
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg p-8 max-w-lg w-full relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-800 transition-colors"
        >
          <X size={24} />
        </button>
        <div className="flex items-center gap-3 mb-6">
          <Ruler size={24} />
          <h3 className="text-2xl font-bold">Guía de Talles</h3>
        </div>

        <p className="text-gray-600 mb-6 text-sm">
          Para encontrar tu talle, te recomendamos medir la <strong>cintura</strong> y el <strong>tiro</strong> de un jean que te quede bien (apoyado en una superficie plana) y compararlo con nuestra tabla.
        </p>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50">
                <th className="p-3 font-semibold text-sm border-b">Talle</th>
                <th className="p-3 font-semibold text-sm border-b">Cintura (Prenda Plana)</th>
                <th className="p-3 font-semibold text-sm border-b">Tiro Delantero</th>
              </tr>
            </thead>
            <tbody>
              {sizeData.map((row) => (
                <tr key={row.size} className="hover:bg-gray-50">
                  <td className="p-3 border-b border-gray-200 font-medium">
                    {row.size}
                  </td>
                  <td className="p-3 border-b border-gray-200 text-gray-700">
                    {row.waist}
                  </td>
                  <td className="p-3 border-b border-gray-200 text-gray-700">
                    {row.rise}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg text-sm text-blue-800">
          <b>Tip:</b> La medida más importante es la cintura. Si estás entre dos talles, te recomendamos elegir el más grande.
        </div>
      </div>
    </div>
  );
};

export default SizeGuideModal;

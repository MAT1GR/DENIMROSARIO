import React from 'react';
import { Instagram } from 'lucide-react'; // Import Instagram icon
import { Testimonial } from '../../server/types';

interface TestimonialCardProps {
  testimonial: Testimonial;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ testimonial }) => {
  return (
    <div className="bg-blanco-hueso p-6 rounded-lg shadow-sm border border-gris-oscuro/10">
      <div className="mb-2 flex justify-between items-center">
        <p className="font-medium text-gris-oscuro">{testimonial.customerName}</p>
        <Instagram className="w-4 h-4 opacity-50" />
      </div>
      <p className="text-gris-oscuro italic opacity-80">"{testimonial.content}"</p>
    </div>
  );
};

export default TestimonialCard;
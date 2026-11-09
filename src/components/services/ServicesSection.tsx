import React, { useState } from 'react';
import { SectionHeading } from '../common/SectionHeading';
import { ServiceCard } from './ServiceCard';
import { ServiceModal } from './ServiceModal';
import { usePortfolio } from '../../context/PortfolioContext';
import { Service } from '../../types';

interface ServicesSectionProps {
  onSelectServiceForEnquiry?: (serviceName: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  onSelectServiceForEnquiry,
}) => {
  const { data } = usePortfolio();
  const services = data?.services || [];
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  const handleEnquire = (serviceTitle: string) => {
    if (onSelectServiceForEnquiry) {
      onSelectServiceForEnquiry(serviceTitle);
    }
    const contactEl = document.getElementById('contact');
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="services" className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-space-950 overflow-hidden">
      {/* Background Decorative Glow */}
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] rounded-full bg-electric-blue/5 blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <SectionHeading
          badge="Specialized Offerings"
          title="Solutions"
          highlight="I Build."
          description="Engineered to establish indisputable authority, engage constituents and clients, and deliver measurable digital outcomes."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
          {services.map((service, index) => (
            <ServiceCard
              key={service.id}
              service={service}
              index={index}
              onSelect={setSelectedService}
              onEnquire={handleEnquire}
            />
          ))}
        </div>
      </div>

      {/* Service Details Modal */}
      <ServiceModal
        service={selectedService}
        onClose={() => setSelectedService(null)}
        onEnquire={handleEnquire}
      />
    </section>
  );
};

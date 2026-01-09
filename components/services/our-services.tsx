// components/services/our-services.tsx

import React from 'react';

const OurServices = () => {
  return (
    <section className="h-screen bg-white py-20 snap-start flex items-center snap-start">
      <div className="max-w-4xl mx-auto text-center">
        {/* Label */}
        <span className="text-[#E85A2C] font-medium text-sm tracking-wide">
          Our Services
        </span>

        {/* Main Heading */}
        <h2 className="text-4xl md:text-5xl font-bold text-black mt-4 mb-6">
          End-to-end digital services,{' '}
          <span className="text-[#E85A2C]">simplified.</span>
        </h2>

        {/* Description */}
        <p className="text-gray-600 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
          3D Geoscan provides industrial, Oil & Gas, construction, Architecture,
          petrochemicals, and archeological sectors with reliable state-of-the-art
          services
        </p>
      </div>
    </section>
  );
};

export default OurServices;
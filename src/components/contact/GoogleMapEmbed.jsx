import React from 'react';
import { CLINIC_INFO } from '../../data/clinicData';

export default function GoogleMapEmbed() {
  const coords = CLINIC_INFO.coordinates;
  const lat = coords[0];
  const lng = coords[1];

  // Google Maps embed URL with exact coordinates and verified pharmacy listing
  const label = encodeURIComponent(CLINIC_INFO.listingTitle || CLINIC_INFO.legalName);
  const embedUrl = `https://maps.google.com/maps?q=${lat},${lng}+(${label})&t=m&z=17&ie=UTF8&iwloc=B&output=embed`;

  return (
    <div className="relative w-full h-80 sm:h-96 rounded-2xl overflow-hidden border border-sand shadow-sm bg-sand/20">
      <iframe
        title="Google Maps - Maruthi Homoeo Centre Pharmacy"
        src={embedUrl}
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="w-full h-full"
      />
    </div>
  );
}

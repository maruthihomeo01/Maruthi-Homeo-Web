import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { CLINIC_INFO } from '../../data/clinicData';

// Fix for default marker icons in Leaflet when bundled with Vite
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png'
});

export default function ClinicMap() {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      const coords = CLINIC_INFO.coordinates;
      const map = L.map(mapContainerRef.current).setView(coords, 16);

      L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {
        attribution: 'Tiles &copy; Esri',
        maxZoom: 19
      }).addTo(map);

      const marker = L.marker(coords).addTo(map);
      marker
        .bindPopup(
          `<strong>${CLINIC_INFO.legalName}</strong><br/>${CLINIC_INFO.address.fullAddress}<br/>Phone: ${CLINIC_INFO.phone}`
        )
        .openPopup();

      mapInstanceRef.current = map;
    }

    const timer = setTimeout(() => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.invalidateSize();
      }
    }, 200);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <div
      ref={mapContainerRef}
      id="clinic-map"
      className="w-full h-72 rounded-xl border border-sand overflow-hidden z-10"
    />
  );
}

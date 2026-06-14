'use client';

import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { BH_CENTER, BH_ZOOM, SEVERITY_COLORS, REPORT_TYPE_ICONS } from '@/utils/constants';
import { REPORT_TYPE_LABELS, SEVERITY_LABELS } from '@/types';
import type { Report } from '@/types';

// Fix Leaflet marker icons
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

function createCustomIcon(severity: string) {
  const color = SEVERITY_COLORS[severity] || '#6B7280';
  return L.divIcon({
    className: 'custom-marker',
    html: `<div style="
      width: 32px;
      height: 32px;
      background: ${color};
      border: 3px solid white;
      border-radius: 50%;
      box-shadow: 0 2px 8px rgba(0,0,0,0.3);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 14px;
    "></div>`,
    iconSize: [32, 32],
    iconAnchor: [16, 16],
    popupAnchor: [0, -20],
  });
}

interface MapViewProps {
  reports: Report[];
  onSelectReport?: (report: Report) => void;
}

function MapContent({ reports, onSelectReport }: MapViewProps) {
  return (
    <>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {reports.map((report) => (
        <Marker
          key={report.id}
          position={[report.latitude, report.longitude]}
          icon={createCustomIcon(report.severity)}
          eventHandlers={{
            click: () => onSelectReport?.(report),
          }}
        >
          <Popup>
            <div className="min-w-[200px]">
              <div className="flex items-center gap-2 mb-1">
                <span>{REPORT_TYPE_ICONS[report.type]}</span>
                <strong className="text-sm">{REPORT_TYPE_LABELS[report.type]}</strong>
              </div>
              <p className="text-xs text-gray-600 mb-1">{report.description}</p>
              <p className="text-xs text-gray-400">{report.address}</p>
              <div className="mt-2 flex gap-1">
                <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: SEVERITY_COLORS[report.severity] + '20', color: SEVERITY_COLORS[report.severity] }}>
                  {SEVERITY_LABELS[report.severity]}
                </span>
              </div>
            </div>
          </Popup>
        </Marker>
      ))}
    </>
  );
}

export default function MapView({ reports, onSelectReport }: MapViewProps) {
  return (
    <MapContainer
      center={[BH_CENTER.lat, BH_CENTER.lng]}
      zoom={BH_ZOOM}
      style={{ height: '500px', width: '100%' }}
      className="rounded-2xl"
    >
      <MapContent reports={reports} onSelectReport={onSelectReport} />
    </MapContainer>
  );
}

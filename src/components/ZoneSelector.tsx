import React from 'react';

interface ZoneSelectorProps {
  selectedZone: string;
  onZoneChange: (zone: string) => void;
}

export default function ZoneSelector({ selectedZone, onZoneChange }: ZoneSelectorProps) {
  return (
    <div className="zone-selector">
      <select
        value={selectedZone}
        onChange={(e) => onZoneChange(e.target.value)}
        className="select-input"
      >
        <option value="SE1">SE1 (Luleå)</option>
        <option value="SE2">SE2 (Sundsvall)</option>
        <option value="SE3">SE3 (Stockholm)</option>
        <option value="SE4">SE4 (Malmö)</option>
      </select>
      <style>{`
        .zone-selector {
          position: relative;
        }
        .select-input {
          appearance: none;
          background: rgba(75, 192, 192, 0.1);
          border: 1px solid rgba(75, 192, 192, 0.2);
          border-radius: 8px;
          color: rgb(75, 192, 192);
          padding: 0.75rem 2.5rem 0.75rem 1rem;
          font-size: 0.9rem;
          cursor: pointer;
          outline: none;
          transition: all 0.2s ease;
        }
        .select-input:hover, .select-input:focus {
          border-color: rgba(75, 192, 192, 0.4);
          background: rgba(75, 192, 192, 0.15);
        }
        .zone-selector::after {
          content: '';
          position: absolute;
          right: 1rem;
          top: 50%;
          transform: translateY(-50%);
          width: 0;
          height: 0;
          border-left: 5px solid transparent;
          border-right: 5px solid transparent;
          border-top: 5px solid rgb(75, 192, 192);
          pointer-events: none;
        }
        @media (max-width: 768px) {
          .select-input {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
}
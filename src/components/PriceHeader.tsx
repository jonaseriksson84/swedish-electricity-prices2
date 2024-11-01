import React from 'react';

interface PriceHeaderProps {
  currentPrice: number | null;
  highestPrice: number;
  lowestPrice: number;
  selectedZone: string;
  onZoneChange: (zone: string) => void;
}

export default function PriceHeader({
  currentPrice,
  highestPrice,
  lowestPrice,
  selectedZone,
  onZoneChange,
}: PriceHeaderProps) {
  return (
    <div className="price-header">
      <div className="price-info">
        <div className="summary-item current">
          <span className="value">
            {currentPrice !== null
              ? `${currentPrice.toFixed(2)} SEK/kWh`
              : 'N/A'}
          </span>
          <span className="label">Current Price</span>
        </div>
        <div className="divider" />
        <div className="summary-item">
          <span className="value">{highestPrice.toFixed(2)} SEK/kWh</span>
          <span className="label">Highest</span>
        </div>
        <div className="divider" />
        <div className="summary-item">
          <span className="value">{lowestPrice.toFixed(2)} SEK/kWh</span>
          <span className="label">Lowest</span>
        </div>
        <div className="divider" />
        <select
          value={selectedZone}
          onChange={(e) => onZoneChange(e.target.value)}
          className="zone-select"
        >
          <option value="SE1">SE1 (Luleå)</option>
          <option value="SE2">SE2 (Sundsvall)</option>
          <option value="SE3">SE3 (Stockholm)</option>
          <option value="SE4">SE4 (Malmö)</option>
        </select>
      </div>
      <style>{`
        .price-header {
          background: rgba(75, 192, 192, 0.1);
          border: 1px solid rgba(75, 192, 192, 0.2);
          border-radius: 12px;
          // padding: .5rem 1rem;
          margin-bottom: 2rem;
        }
        .price-info {
          display: flex;
          align-items: center;
          gap: 1.5rem;
          justify-content: space-between;
        }
        .summary-item {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
          padding: .5rem 1rem;
        }
        .summary-item.current {
          align-items: flex-start;
        }
        .summary-item.current .value {
          font-weight: 700;
          font-size: 2rem;
          color: rgba(75, 192, 192, 0.8);
        }
        .value {
          color: rgb(75, 192, 192, 0.6);
          font-size: 1.1rem;
          font-weight: 600;
        }
        .label {
          color: rgba(255, 255, 255, 0.7);
          font-size: 0.85rem;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        .divider {
          width: 1px;
          height: 100px;
          background: rgba(75, 192, 192, 0.2);
        }
        .zone-select {
          appearance: none;
          background: rgba(75, 192, 192, 0.1);
          border: 1px solid rgba(75, 192, 192, 0.2);
          border-radius: 8px;
          color: rgb(75, 192, 192);
          padding: 0.5rem 2rem 0.5rem 1rem;
          margin: 1rem;
          font-size: 0.9rem;
          cursor: pointer;
          outline: none;
          transition: all 0.2s ease;
          position: relative;
        }
        .zone-select:hover, .zone-select:focus {
          border-color: rgba(75, 192, 192, 0.4);
          background: rgba(75, 192, 192, 0.15);
        }
        @media (max-width: 768px) {
          .price-header {
            flex-wrap: wrap;
          }
          .price-info {
            align-items: stretch;
            gap: 0rem;
            flex-wrap: wrap;
          }
          .summary-item {
            width: 50%;
            align-items: center;
            text-align: center;
            box-sizing: border-box;
            border-bottom: 1px solid rgba(75, 192, 192, 0.2);
          }
          .summary-item .value, .summary-item .label {
            font-size: .8rem;
          }
          .summary-item.current {
            width: 100%;
            align-items: center;
          }
          .summary-item.current .value {
            font-size: 1.2rem;
          }
          .divider {
            display: none;
          }
          .zone-select {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
}

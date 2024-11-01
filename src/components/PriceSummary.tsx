import React from 'react';

interface PriceSummaryProps {
  currentPrice: number | null;
  highestPrice: number;
  lowestPrice: number;
}

export default function PriceSummary({ currentPrice, highestPrice, lowestPrice }: PriceSummaryProps) {
  return (
    <div className="price-summary">
      <div className="summary-item">
        <span className="label">Current:</span>
        <span className="value">{currentPrice !== null ? `${currentPrice.toFixed(2)} SEK/kWh` : 'N/A'}</span>
      </div>
      <div className="separator" />
      <div className="summary-item">
        <span className="label">Highest:</span>
        <span className="value">{highestPrice.toFixed(2)} SEK/kWh</span>
      </div>
      <div className="separator" />
      <div className="summary-item">
        <span className="label">Lowest:</span>
        <span className="value">{lowestPrice.toFixed(2)} SEK/kWh</span>
      </div>
      <style>{`
        .price-summary {
          display: flex;
          align-items: center;
          background: rgba(75, 192, 192, 0.1);
          border: 1px solid rgba(75, 192, 192, 0.2);
          border-radius: 8px;
          padding: 1rem 1.5rem;
        }
        .summary-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        .label {
          color: rgba(255, 255, 255, 0.7);
          font-size: 0.9rem;
        }
        .value {
          font-size: 1.1rem;
          font-weight: 600;
          color: rgb(75, 192, 192);
        }
        .separator {
          width: 1px;
          height: 24px;
          background: rgba(75, 192, 192, 0.2);
          margin: 0 1.5rem;
        }
        @media (max-width: 768px) {
          .price-summary {
            flex-direction: column;
            gap: 1rem;
            align-items: flex-start;
          }
          .separator {
            display: none;
          }
        }
      `}</style>
    </div>
  );
}
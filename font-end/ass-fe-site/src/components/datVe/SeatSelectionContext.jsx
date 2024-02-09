import React, { createContext, useContext, useState } from 'react';

const SeatSelectionContext = createContext();

export function SeatSelectionProvider({ children }) {
  const [selectedSeats, setSelectedSeats] = useState([]);
  return (
    <SeatSelectionContext.Provider value={{ selectedSeats, setSelectedSeats }}>
      {children}
    </SeatSelectionContext.Provider>
  );
}

export function useSeatSelection() {
  const context = useContext(SeatSelectionContext);
  if (!context) {
    throw new Error('useSeatSelection must be used within a SeatSelectionProvider');
  }
  return context;
}
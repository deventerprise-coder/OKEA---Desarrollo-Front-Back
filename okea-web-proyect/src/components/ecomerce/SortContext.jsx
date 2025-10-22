import { useState } from 'react';
import { SortContext } from './SortContextCreate';
import { SORT_OPTIONS, sortProducts } from './sortUtils';

export function SortProvider({ children }) {
  const [selected, setSelected] = useState("Precio más bajo");

  const value = {
    selected,
    setSelected,
    sortOptions: SORT_OPTIONS,
    sortProducts,
  };

  return (
    <SortContext.Provider value={value}>
      {children}
    </SortContext.Provider>
  );
}
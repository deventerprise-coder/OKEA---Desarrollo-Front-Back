import { useContext } from 'react';
import { SortContext } from './SortContextCreate';

export function useSort() {
  const context = useContext(SortContext);
  if (!context) {
    throw new Error('useSort debe ser usado dentro de un SortProvider');
  }
  return context;
}
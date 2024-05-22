import { useContext } from 'react';
import { FilterContext } from '../context/FilterContext';

export function useFilters() {
  const { filters, setFilters } = useContext(FilterContext);

  const filterProducts = (products) => {
    return products.filter((product) => {
      return (
        filters.categoria === 'all' || product.categoria === filters.categoria
      );
    });
  };

  return { filters, filterProducts, setFilters };
}

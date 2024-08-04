import { createContext, useCallback, useContext, useState } from 'react';
import debounce from 'lodash/debounce';
import { searchRequest } from '../api/search';

export const SearchContext = createContext();

export const useSearch = () => {
  return useContext(SearchContext);
};

export const SearchProvider = ({ children }) => {
  const [searchPages, setSearchPages] = useState([]);
  const [searchProducts, setProductsSearch] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const search = async (query) => {
    if (!query) {
      setSearchPages([]); // Limpiar los resultados si la query está vacía
      setProductsSearch([]);

      return;
    }

    setLoading(true);
    setError(null);
    try {
      const response = await searchRequest(query);
      setSearchPages(response.data.pages);
      setProductsSearch(response.data.products);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const debouncedSearch = useCallback(debounce(search, 500), []);

  return (
    <SearchContext.Provider
      value={{
        searchPages,
        searchProducts,
        loading,
        error,
        search,
        debouncedSearch,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

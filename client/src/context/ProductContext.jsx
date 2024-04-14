import { createContext, useContext, useState } from 'react';
import {
  createProductRequest,
  getProductsRequest,
  getProductRequest,
} from '../api/products';

const ProductContext = createContext();

export const useProduct = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProduct must be used within a ProductProvider');
  }
  return context;
};

export function ProductProvider({ children }) {
  const [products, setProducts] = useState([]);

  const createProduct = async (product) => {
    const res = await createProductRequest(product);
    console.log(res);
  };

  const getProducts = async () => {
    try {
      const res = await getProductsRequest();
      setProducts(res.data);
      console.log(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const getProduct = async (id) => {
    try {
      const res = await getProductRequest(id);
      return res.data;
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <ProductContext.Provider
      value={{ products, createProduct, getProducts, getProduct }}
    >
      {children}
    </ProductContext.Provider>
  );
}

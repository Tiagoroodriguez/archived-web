import { createContext, useContext, useState } from 'react';
import {
  createProductRequest,
  getProductsRequest,
  getProductRequest,
  updateProductStockRequest,
  deleteProductsRequest,
  updateProductRequest,
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
    console.log(res.data);
    setProducts([...products, res.data]);
  };

  const getProducts = async (limit = null, categoria = null) => {
    try {
      let res;
      if (limit !== null || categoria !== null) {
        res = await getProductsRequest(limit, categoria);
      } else {
        res = await getProductsRequest();
      }
      if (!categoria && !limit) {
        setProducts(res.data);
      }
      return res.data; // Devolver los productos obtenidos
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

  const updateProduct = async (product) => {
    try {
      await updateProductRequest(product);
    } catch (error) {
      console.error(error);
    }
  };

  const updateProductStock = async (id, talle, quantity) => {
    try {
      await updateProductStockRequest(id, talle, quantity);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteProduct = async (id) => {
    try {
      await deleteProductsRequest(id);
      setProducts(products.filter((product) => product._id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        createProduct,
        getProducts,
        getProduct,
        updateProductStock,
        deleteProduct,
        updateProduct,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}

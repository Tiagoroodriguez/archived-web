import { createContext, useContext, useState } from 'react';
import {
  createProductRequest,
  getProductsRequest,
  getProductRequest,
  updateProductStockRequest,
  deleteProductsRequest,
  updateProductRequest,
} from '../api/products';
import {
  createDiscountRequest,
  deleteDiscountRequest,
} from '../api/descuentos';

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

  const getProducts = async (
    limit = null,
    categoria = null,
    coleccion = null
  ) => {
    try {
      let res;
      if (limit !== null || categoria !== null || coleccion !== null) {
        res = await getProductsRequest(limit, categoria, coleccion);
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
      const response = await updateProductStockRequest(id, talle, quantity);
      if (response.status !== 200) {
        throw new Error('Error actualizando el stock');
      }
    } catch (error) {
      console.error(
        'Error actualizando el stock:',
        error.response?.data || error.message
      );
      throw error; // Lanzar el error para que pueda ser manejado en addToCart
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

  const createDiscount = async (discount) => {
    try {
      const res = await createDiscountRequest(discount);
      return res.data;
    } catch (error) {
      console.error(error);
    }
  };

  const deleteDiscount = async (id) => {
    try {
      await deleteDiscountRequest(id);
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
        createDiscount,
        deleteDiscount,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}

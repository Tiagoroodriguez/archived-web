import { createContext, useState, useEffect } from 'react';
import { toast } from 'sonner';
import { useProduct } from './ProductContext';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(
    localStorage.getItem('cartItems')
      ? JSON.parse(localStorage.getItem('cartItems'))
      : []
  );

  // Utilizamos este estado para manejar cuando el carrito fue modificado por última vez
  const [lastUpdated, setLastUpdated] = useState(
    localStorage.getItem('cartTime')
      ? parseInt(localStorage.getItem('cartTime'), 10)
      : new Date().getTime()
  );

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const time = 5 * 60 * 60 * 1000;

      // Verificar si el carrito tiene elementos antes de ejecutar la limpieza
      if (cartItems.length > 0 && lastUpdated && now - lastUpdated > time) {
        clearCart();
        localStorage.removeItem('cartItems');
        localStorage.removeItem('cartTime');
      }
    }, 1000);

    return () => clearInterval(interval); // Limpiar el intervalo cuando el componente se desmonta
  }, [cartItems, lastUpdated]);

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    localStorage.setItem('cartTime', lastUpdated ? lastUpdated.toString() : '');
  }, [cartItems, lastUpdated]);

  const { updateProductStock } = useProduct(); // Use the updateProductStock function from ProductContext

  const addToCart = async (item, talle) => {
    const itemWithSize = { ...item, talle };
    const itemKey = `${item._id}-${talle}`; // Clave única combinando ID y talle

    // Verificar si hay stock del talle seleccionado
    const stockAvailable = checkStock(item, talle);

    if (!stockAvailable) {
      // Si no hay stock, mostrar un toast de error
      toast.error('No hay stock disponible de este talle.');
      return;
    }

    const isItemInCart = cartItems.find((cartItem) => cartItem.key === itemKey);

    if (isItemInCart) {
      setCartItems(
        cartItems.map((cartItem) =>
          cartItem.key === itemKey
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        )
      );
    } else {
      setCartItems([
        ...cartItems,
        { ...itemWithSize, quantity: 1, key: itemKey },
      ]);
    }
    // Restar del stock
    await updateProductStock(item._id, talle, 1);
    setLastUpdated(new Date().getTime());
    toast.success('Producto agregado al carrito');
  };

  // Función para verificar el stock del talle seleccionado
  const checkStock = (item, talle) => {
    let availableStock = 0;

    // Verificar el stock disponible según el talle
    switch (talle) {
      case 'S':
        availableStock = item.cant_s;
        break;
      case 'M':
        availableStock = item.cant_m;
        break;
      case 'L':
        availableStock = item.cant_l;
        break;
      case 'XL':
        availableStock = item.cant_xl;
        break;
      case 'XXL':
        availableStock = item.cant_xxl;
        break;
      default:
        availableStock = 0;
    }

    // Verificar la cantidad del mismo producto en el carrito
    const cartItem = cartItems.find((cartItem) => cartItem._id === item._id);
    const quantityInCart = cartItem ? cartItem.quantity : 0;

    // Comparar la cantidad en el carrito con el stock disponible
    return quantityInCart < availableStock;
  };

  const removeFromCart = async (item) => {
    // Asume que item ya contiene el 'talle' como una propiedad
    const itemKey = `${item._id}-${item.talle}`; // Clave única combinando ID y talle

    const isItemInCart = cartItems.find((cartItem) => cartItem.key === itemKey);

    if (isItemInCart && isItemInCart.quantity === 1) {
      setCartItems(cartItems.filter((cartItem) => cartItem.key !== itemKey));
    } else if (isItemInCart) {
      setCartItems(
        cartItems.map((cartItem) =>
          cartItem.key === itemKey
            ? { ...cartItem, quantity: cartItem.quantity - 1 }
            : cartItem
        )
      );
    }
    await updateProductStock(item._id, item.talle, -1);

    toast.info('Producto eliminado del carrito');
  };

  const clearCart = () => {
    // Restaurar todo el stock
    cartItems.forEach(async (item) => {
      await updateProductStock(item._id, item.talle, -item.quantity);
    });
    setCartItems([]); // set the cart items to an empty array
    toast.info('Carrito vaciado');
  };

  const clearCartLocally = () => {
    localStorage.removeItem('cartItems');
    localStorage.removeItem('cartTime');
    setCartItems([]); // set the cart items to an empty array
  };

  const getCartTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.precio * item.quantity,
      0
    ); // calculate the total price of the items in the cart
  };

  const getCartItems = () => {
    const cartItemsWithInfo = cartItems.map((item) => {
      return {
        id: item._id,
        nombre: item.nombre,
        precio: item.precio,
        cantidad: item.quantity,
      };
    });

    console.log(cartItemsWithInfo);
    return cartItemsWithInfo;
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        getCartTotal,
        getCartItems,
        clearCartLocally,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

import { createContext, useState, useEffect } from 'react';
import { toast } from 'sonner';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(
    localStorage.getItem('cartItems')
      ? JSON.parse(localStorage.getItem('cartItems'))
      : []
  );

  const addToCart = (item, talle) => {
    // Agregar el talle al ítem al momento de crear la clave del carrito
    const itemWithSize = { ...item, talle };
    const itemKey = `${item._id}-${talle}`; // Clave única combinando ID y talle

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
    toast.success('Producto agregado al carrito');
  };

  const removeFromCart = (item) => {
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
  };

  const clearCart = () => {
    setCartItems([]); // set the cart items to an empty array
  };

  const getCartTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.precio * item.quantity,
      0
    ); // calculate the total price of the items in the cart
  };

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    const cartItems = localStorage.getItem('cartItems');
    if (cartItems) {
      setCartItems(JSON.parse(cartItems));
    }
  }, []);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        getCartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

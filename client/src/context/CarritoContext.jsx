import { createContext, useState, useEffect } from 'react';
import { toast } from 'sonner';
import { useProduct } from './ProductContext';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [overlayTalles, setOverlayTalles] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [coupon, setCoupon] = useState([]);
  const [cartItems, setCartItems] = useState(
    localStorage.getItem('cartItems')
      ? JSON.parse(localStorage.getItem('cartItems'))
      : []
  );

  const [lastUpdated, setLastUpdated] = useState(
    localStorage.getItem('cartTime')
      ? parseInt(localStorage.getItem('cartTime'), 10)
      : new Date().getTime()
  );

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const time = 5 * 60 * 60 * 1000;

      if (cartItems.length > 0 && lastUpdated && now - lastUpdated > time) {
        clearCart();
        localStorage.removeItem('cartItems');
        localStorage.removeItem('cartTime');
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [cartItems, lastUpdated]);

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    localStorage.setItem('cartTime', lastUpdated ? lastUpdated.toString() : '');
  }, [cartItems, lastUpdated]);

  const { updateProductStock } = useProduct();

  const addToCart = async (item, talle) => {
    // Generar una clave única basada en el ID del producto y el talle seleccionado
    const itemKey = `${item._id}-${talle}`;

    // Verificar si hay stock del talle seleccionado
    const stockAvailable = checkStock(item, talle);

    if (!stockAvailable) {
      toast.error('No hay stock disponible de este talle.');
      return;
    }

    // Determinar el precio aplicable (precio normal o con descuento)
    const precioAplicable = item.precio_con_descuento || item.precio;

    // Buscar si el ítem ya está en el carrito usando la clave única
    const isItemInCart = cartItems.find((cartItem) => cartItem.key === itemKey);

    if (isItemInCart) {
      // Si el ítem ya está en el carrito, aumentar la cantidad
      setCartItems(
        cartItems.map((cartItem) =>
          cartItem.key === itemKey
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        )
      );
    } else {
      // Si el ítem no está en el carrito, agregarlo con la clave única y la cantidad inicial
      setCartItems([
        ...cartItems,
        { ...item, precio: precioAplicable, quantity: 1, talle, key: itemKey },
      ]);
    }

    // Actualizar el stock del producto
    await updateProductStock(item._id, talle, 1);

    // Actualizar la última vez que se modificó el carrito
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

  const getCartTotal = (coupon) => {
    const subtotal = cartItems.reduce((total, item) => {
      const precioAplicable = item.precio_con_descuento || item.precio;
      return total + precioAplicable * item.quantity;
    }, 0);

    if (coupon) {
      const descuento = subtotal * (coupon.discount_percentage / 100);
      return subtotal - descuento;
    }

    return subtotal; // retorna el total sin descuento si no hay cupón
  };
  const getCartItems = (coupon) => {
    const cartItemsWithInfo = cartItems.map((item) => {
      const precio = coupon
        ? item.precio - (item.precio * coupon.discount_percentage) / 100
        : item.precio;
      return {
        id: item._id,
        nombre: item.nombre,
        precio: precio,
        cantidad: item.quantity,
        talle: item.talle,
      };
    });
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
        overlayTalles,
        setOverlayTalles,
        selectedProduct,
        setSelectedProduct,
        showCart,
        setShowCart,
        coupon,
        setCoupon,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

import mercadopago from 'mercadopago';
import { MERCADOPAGO_ACCESS_TOKEN } from '../config.js';

mercadopago.configure({
  access_token: MERCADOPAGO_ACCESS_TOKEN,
});

export const createOrder = async (req, res) => {
  const productos = req.body;

  const arrayProducto = productos.map((producto) => {
    return {
      id: producto.id,
      title: producto.nombre,
      unit_price: producto.precio,
      currency_id: 'ARS',
      quantity: producto.cantidad,
    };
  });

  try {
    const preferences = {
      items: arrayProducto,

      notification_url: 'https://archived-web-1.onrender.com/api/webhook',
      back_urls: {
        success: 'https://archived-web-six.vercel.app/checkout/pago/success',
        failure: 'https://archived-web-six.vercel.app/failure',
        pending: 'https://archived-web-six.vercel.app/pending',
      },

      auto_return: 'approved',
    };

    const result = await mercadopago.preferences.create(preferences);

    console.log(result);

    res.status(200).json(result.response.init_point);
  } catch (error) {
    console.error(error.message);
  }
};

export const reciverWebhook = async (req, res) => {
  try {
    const payment = req.body;
    //console.log(payment);

    //console.log(payment.type);
    if (payment.type === 'payment') {
      // Recuperamos el ID del pago
      const paymentId = payment.data.id;
      //console.log(paymentId);

      // Recupera los detalles del pago usando el ID
      const paymentDetails = await mercadopago.payment.findById(paymentId);
      console.log(paymentDetails);

      // Guarda los detalles del pago en tu base de datos
      // Implementa la lógica para guardar los detalles del pago en tu base de datos
      // ...
    }
    res.sendStatus(204);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500).json({ error: error.message });
  }
};

export const getOrder = async (req, res) => {
  try {
    const orderId = req.params.id;
    console.log(orderId);
    const response = await mercadopago.merchant_orders.findById(orderId);
    const orderDetails = response.response.items;

    res.status(200).json(orderDetails); // Send order details as JSON response
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message }); // Handle errors
  }
};

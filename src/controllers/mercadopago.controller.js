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

      notification_url:
        'https://fbd5-138-204-152-207.ngrok-free.app/api/webhook',
      back_urls: {
        success: 'http://localhost:5173/checkout/pago/success',
        failure: 'http://localhost:5173/checkout/pago',
        pending: 'http://localhost:5173/pending',
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
    const response = await mercadopago.merchant_orders.findById(req.params.id);
    const orderDetails = response.response.items;
    if (!orderDetails)
      return res.status(404).json({ message: 'Pedido no encontrado' });
    return res.json(orderDetails); // Asegúrate de devolver el contenido adecuado
  } catch (error) {
    return res.status(404).json({ message: 'Pedido no encontrado' });
  }
};

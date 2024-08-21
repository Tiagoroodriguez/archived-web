import express from 'express';
import Subscriber from '../models/subscriber.model.js';
import Coupon from '../models/cupones.model.js';
import { sendMail } from './../controllers/email.controller.js'; // Asegúrate de importar tu función de enviar correo
import pkg from 'uuid';

const { v4: uuidv4 } = pkg;

const router = express.Router();

router.post('/subscribe', async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: 'Email is required' });
  }

  try {
    let subscriber = await Subscriber.findOne({ email });

    if (subscriber) {
      return res.status(400).json({ message: 'Email already subscribed' });
    }

    // Generar un código único para el cupón
    const couponCode = `OFF10-${uuidv4().substr(0, 8)}`;

    // Definir la fecha de validez
    const validFrom = new Date();
    const validUntil = new Date(validFrom);
    validUntil.setDate(validUntil.getDate() + 7); // Válido por 1 semana

    // Crear el cupón
    const newCoupon = new Coupon({
      code: couponCode,
      discount_percentage: 10,
      valid_from: validFrom,
      valid_until: validUntil,
      max_uses: 1,
    });
    await newCoupon.save();

    // Crear y guardar el suscriptor
    subscriber = new Subscriber({
      email,
    });
    await subscriber.save();

    // Crear y enviar el correo al nuevo suscriptor
    const to = email;
    const subject = 'Bienvenido a la familia de Archived';
    const html = `

      <div style="text-align: center; padding: 20px;">
        <h1 style="font-size: 20px;">Gracias por suscribirte a nuestro boletín informativo.</h1>
        <p style="font-size: 14px; color: #1A1F25;">Tu código de descuento es:</p>
        <p style="width: 100%; text-align: center; color: #1A1F25;"><strong style="background: #f2f9f9; border: 1px solid #1A1F25; border-radius: 5px; padding: 10px; width: 200px; margin: 0;">${couponCode}</strong></p>
        <p style="font-size: 14px; color: #1A1F25;">Este cupón te da un 10% de descuento en tu próxima compra. El mismo es válido hasta ${validUntil.toLocaleDateString()}.</p>
        <p style="font-size: 14px; color: #1A1F25;">Canjea tu cupon ahora mismo <a href="https://www.archived.com.ar/tienda">aquí</a>.</p>
        <p style="width: 100%; text-align: end; color: #1A1F25;"><strong>Archived.</strong></p>
    </div>
    `;

    await sendMail({ to, subject, html });

    res
      .status(201)
      .json({ message: 'Subscribed successfully, coupon code sent' });
  } catch (error) {
    console.error('Error subscribing user:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/subscribers', async (req, res) => {
  try {
    const subscribers = await Subscriber.find();
    res.status(200).json(subscribers);
  } catch (error) {
    console.error('Error getting subscribers:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/check-subscription', async (req, res) => {
  const { email } = req.query;
  const user = await Subscriber.findOne({ email });
  res.json({ subscribed: user ? user.subscribed : false });
});

router.delete('/unsubscribe', async (req, res) => {
  const { email } = req.body;

  try {
    let subscriber = await Subscriber.findOneAndDelete({ email });

    if (!subscriber)
      return res.status(404).json({ message: 'subscriber not found' });
    return res.sendStatus(204);
  } catch (error) {
    return res.status(404).json({ message: 'subscriber no encontrado' });
  }
});

export default router;

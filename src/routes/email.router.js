import { Router } from 'express';
import { sendMail } from '../controllers/email.controller.js';

const router = Router();

router.post('/send-email', async (req, res) => {
  try {
    const { to, subject, html } = req.body; // Extraer los datos desde el cuerpo de la solicitud
    await sendMail({ to, subject, html }); // Llamar a la función sendMail con los datos
    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error sending email', error: error.message });
  }
});

export default router;

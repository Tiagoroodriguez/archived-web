import { Router } from 'express';
import { sendMail } from '../controllers/email.controller.js';

const router = Router();

router.post('/send-email', async (req, res) => {
  const { to, subject, html } = req.body;

  if (!to || !subject || !html) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    const { data } = await sendMail({ to, subject, html });

    return res.json({ data });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

export default router;

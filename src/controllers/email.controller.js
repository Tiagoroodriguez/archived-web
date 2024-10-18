/* OPCION RESEND- DESVENTAJA: 3000 POR MES -  VETAJAS: LO DEJA EN PRINCIPAL*/
import { Resend } from 'resend';
import { EMAIL_KEY } from '../config.js';

const resend = new Resend(EMAIL_KEY);

export const sendMail = async ({ to, subject, html }) => {
  if (!to || !subject || !html) {
    throw new Error('Missing required fields');
  }

  // Enviar solo a una dirección de correo de prueba
  const testEmail = 'tiagorodriguez0202@gmail.com';
  const recipient = process.env.NODE_ENV === 'development' ? testEmail : to;

  try {
    const { data, error } = await resend.emails.send({
      from: 'No-reply <archived@resend.dev>',
      to: [to],
      subject,
      html,
    });

    if (error) {
      throw new Error(error.message || 'Failed to send email');
    }

    return { data };
  } catch (err) {
    throw new Error(err.message || 'Error sending email');
  }
};

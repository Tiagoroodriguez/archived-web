/* OPCION RESEND- DESVENTAJA: 3000 POR MES -  VETAJAS: LO DEJA EN PRINCIPAL*/
import { Resend } from 'resend';
import { EMAIL_KEY } from '../config.js';

const resend = new Resend(EMAIL_KEY);

export const sendMail = async (req, res) => {
  const { to, subject, html } = req.body;

  if (!to || !subject || !html) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const { data, error } = await resend.emails.send({
    from: 'No-reply <archived@resend.dev>',
    to: [to],
    subject,
    html,
  });

  if (error) {
    return res.status(400).json({ error });
  }

  res.status(200).json({ data });
};
/*  OPCION DE BREVO - DESVENTAJAS: TE LO MANDA A SPAM - VENTAJAS: 300 DIARIOS
import brevo from '@getbrevo/brevo';
const apiInstance = new brevo.TransactionalEmailsApi();

apiInstance.setApiKey(
  brevo.TransactionalEmailsApiApiKeys.apiKey,
  'key'
);

export const sendMail = async (req, res) => {
  try {
    const sendSmtpEmail = new brevo.SendSmtpEmail();

    sendSmtpEmail.subject = 'Hello, World!';
    sendSmtpEmail.to = [
      {
        email: 'tiagorodriguez0202@gmail.com',
        name: 'Tiago',
      },
    ];
    sendSmtpEmail.htmlContent =
      '<html><body><h1>Hello, world!</h1></body></html>';

    sendSmtpEmail.sender = {
      name: 'Archived',
      email: 'tiagorodriguez0202@gmail.com',
    };

    const response = await apiInstance.sendTransacEmail(sendSmtpEmail);
    console.log(response);
    res.json(response);
  } catch (error) {
    console.error('Error al enviar el correo:', error);
    res.status(500).json({
      message: 'Error al enviar el correo',
      error: error.message,
    });
  }
};*/

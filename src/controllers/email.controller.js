import nodemailer from 'nodemailer';

export const sendMail = async ({ to, subject, html }) => {
  if (!to || !subject || !html) {
    throw new Error('Missing required fields');
  }

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'archived.system.222@gmail.com',
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: 'No-reply <system@archived.com.ar>',
      to, // Enviar al correo recibido por parámetro
      subject, // Asignar el asunto recibido por parámetro
      html, // Usar el HTML dinámico recibido por parámetro
    };

    // Usar la versión async
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent: ' + info.response);
  } catch (err) {
    throw new Error(err.message || 'Error al enviar el email');
  }
};

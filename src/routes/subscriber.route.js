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
    <!doctype html>
      <html>
        <head>
          <meta name="viewport" content="width=device-width">
          <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
          <title>Bienvenida a la familia Archived</title>
        <style>
      @media only screen and (max-width: 620px) {
        table[class=body] h1 {
          font-size: 28px !important;
          margin-bottom: 10px !important;
        }

        table[class=body] p,
      table[class=body] ul,
      table[class=body] ol,
      table[class=body] td,
      table[class=body] span,
      table[class=body] a {
          font-size: 16px !important;
        }

        table[class=body] .wrapper,
      table[class=body] .article {
          padding: 10px !important;
        }

        table[class=body] .content {
          padding: 0 !important;
        }

        table[class=body] .container {
          padding: 0 !important;
          width: 100% !important;
        }

        table[class=body] .main {
          border-left-width: 0 !important;
          border-radius: 0 !important;
          border-right-width: 0 !important;
        }

        table[class=body] .btn table {
          width: 100% !important;
        }

        table[class=body] .btn a {
          width: 100% !important;
        }

        table[class=body] .img-responsive {
          height: auto !important;
          max-width: 100% !important;
          width: auto !important;
        }
      }
      @media all {
        .ExternalClass {
          width: 100%;
        }

        .ExternalClass,
      .ExternalClass p,
      .ExternalClass span,
      .ExternalClass font,
      .ExternalClass td,
      .ExternalClass div {
          line-height: 100%;
        }

        .apple-link a {
          color: inherit !important;
          font-family: inherit !important;
          font-size: inherit !important;
          font-weight: inherit !important;
          line-height: inherit !important;
          text-decoration: none !important;
        }
      }
      </style></head>
        <body class style="background-color: #1A1F25; color: #f2f2f2; font-family: Helvetica, 'Helvetica Neue', Arial, 'Lucida Grande', sans-serif; -webkit-font-smoothing: antialiased; font-size: 14px; line-height: 1.4; margin: 0; padding: 0; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;">
          <table role="presentation" border="0" cellpadding="0" cellspacing="0" class="body" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; min-width: 100%; background-color: #1A1F25; width: 100%;" width="100%" bgcolor="#1A1F25">
            <tr>
              <td style="font-family: sans-serif; font-size: 14px; vertical-align: top;" valign="top">&nbsp;</td>
              <td class="container" style="font-family: sans-serif; font-size: 14px; vertical-align: top; display: block; max-width: 580px; padding: 10px; width: 580px; Margin: 0 auto;" width="580" valign="top">

                <div class="content" style="box-sizing: border-box; display: block; Margin: 0 auto; max-width: 580px; padding: 10px;">

                  <!-- START CENTERED WHITE CONTAINER -->
                  <table role="presentation" class="main" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; min-width: 100%; background: #1A1F25; border-radius: 3px; width: 100%; height: 100%; box-shadow: rgba(0, 0, 0, 0.1) 0px 20px 25px -5px, rgba(0, 0, 0, 0.04) 0px 10px 10px -5px;" width="100%" height="100%">

                    <!-- START MAIN CONTENT AREA -->
                    <tr>
                      <td class="wrapper" style="font-family: sans-serif; font-size: 14px; vertical-align: top; box-sizing: border-box; padding: 20px;" valign="top">
                        <table style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; min-width: 100%; width: 100%;" width="100%">
                          <tr>
                            <td class="align-center margin header" width="100%" style="font-family: sans-serif; font-size: 14px; vertical-align: top; padding: 20px; text-align: center;" valign="top" align="center">
                              <a href="https://www.archived.com.ar/" style="color: #f2f2f2; text-decoration: underline; cursor: pointer;"><img class="header" src="https://firebasestorage.googleapis.com/v0/b/archived-web.appspot.com/o/utils%2Farchived-logo-blanco.png?alt=media&token=24593a8b-f329-44d8-88d0-98678d1a3f6b" height="40" alt="Archived" style="border: none; -ms-interpolation-mode: bicubic; max-width: 100%; padding: 20px;"></a>
                            </td>
                          </tr>
                          <tr>
                            <td align="center" style="font-family: sans-serif; font-size: 14px; vertical-align: top;" valign="top">
                              <p style="font-family: Helvetica, 'Helvetica Neue', Arial, 'Lucida Grande', sans-serif; font-size: 14px; font-weight: normal; margin: 0; margin-bottom: 15px;">Gracias por formar parte de esta familia.</p>
                              <p style="font-family: Helvetica, 'Helvetica Neue', Arial, 'Lucida Grande', sans-serif; font-size: 14px; font-weight: normal; margin: 0; margin-bottom: 15px;">Disfruta de este codigo de <strong>10%</strong> de descuento en tu proxima compra.</p>
                              <table role="presentation" border="0" cellpadding="0" cellspacing="0" class="btn btn-primary" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; min-width: 100%; box-sizing: border-box; width: 100%;" width="100%">
                                <tbody>
                                  <tr>
                                    <td align="center" style="font-family: sans-serif; font-size: 14px; vertical-align: top; padding-bottom: 15px;" valign="top">
                                      <table role="presentation" border="0" cellpadding="0" cellspacing="0" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; min-width: auto; width: auto;" width="auto">
                                        <tbody>
                                          <tr>
                                            <td style="font-family: sans-serif; font-size: 14px; vertical-align: top; background-color: #1A1F25; border-radius: 5px; text-align: center;" valign="top" bgcolor="#1A1F25" align="center"><span style="background-color: #2d333b56; border: solid 1px #f2f2f2bb; border-radius: 5px; box-sizing: border-box; color: #f2f2f2; display: inline-block; font-size: 14px; font-weight: bold; margin: 0; padding: 12px 25px; text-decoration: none; text-transform: capitalize;">${couponCode}</span> </td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                              <p style="font-family: Helvetica, 'Helvetica Neue', Arial, 'Lucida Grande', sans-serif; font-size: 14px; font-weight: normal; margin: 0; margin-bottom: 15px;">Este cupon sera valido hasta el <strong>${validUntil.toLocaleDateString()}</strong>.</p>
                              <p style="font-family: Helvetica, 'Helvetica Neue', Arial, 'Lucida Grande', sans-serif; font-size: 14px; font-weight: normal; margin: 0; margin-bottom: 15px;">Canjealo ahora mismo <a href="https://www.archived.com.ar/tienda?categoria=all" style="color: #f2f2f2; text-decoration: underline; cursor: pointer;">entrando aquí</a>.</p>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  <!-- END MAIN CONTENT AREA -->
                  </table>

                
                </div>
              </td>
              <td style="font-family: sans-serif; font-size: 14px; vertical-align: top;" valign="top">&nbsp;</td>
            </tr>
          </table>
        </body>
      </html>
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

router.delete('/unsubscribe/all', async (req, res) => {
  try {
    await Subscriber.deleteMany({});

    return res.sendStatus(204); // No Content
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'Error eliminando suscriptores', error });
  }
});

export default router;

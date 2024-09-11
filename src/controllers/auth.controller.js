import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import { createAccessToken } from '../libs/jwt.js';
import { TOKEN_SECRET } from '../config.js';
import jwt from 'jsonwebtoken';
import { sendMail } from '../controllers/email.controller.js';

export const register = async (req, res) => {
  const { nombre, apellido, email, password } = req.body;

  try {
    //validacion de usuario
    const userFound = await User.findOne({ email });
    if (userFound) return res.status(400).json(['The email already exists']);

    // encriptamos la contraseña
    const passwordHash = await bcrypt.hash(password, 10);

    // creamos el usuario
    const newUser = new User({
      nombre,
      apellido,
      email,
      password: passwordHash,
    });

    // token de usuario
    const userSaved = await newUser.save();
    const token = await createAccessToken({ id: userSaved._id });
    res.cookie('token', token);
    res.json({
      id: userSaved._id,
      nombre: userSaved.nombre,
      apellido: userSaved.apellido,
      email: userSaved.email,
      createdAt: userSaved.createdAt,
      updateAt: userSaved.updatedAt,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // validacion de contraseñas que ingresa con la contraseña guardada
    const userFound = await User.findOne({ email });
    // si no se encontro el usuario, retorna el error
    if (!userFound)
      return res.status(400).json({ message: 'Usuario no encontrado' });

    // comparamos las contraseñas
    const isMatch = await bcrypt.compare(password, userFound.password);
    if (!isMatch)
      return res.status(400).json({ message: 'Contraseña incorrecta' });

    // token de usuario
    const token = await createAccessToken({ id: userFound._id });

    res.cookie('token', token);
    res.json({
      id: userFound._id,
      nombre: userFound.nombre,
      apellido: userFound.apellido,
      email: userFound.email,
      rol: userFound.rol,
      createdAt: userFound.createdAt,
      updateAt: userFound.updatedAt,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const logout = async (req, res) => {
  res.cookie('token', '', {
    expires: new Date(0),
  });
  return res.sendStatus(200);
};

export const profile = async (req, res) => {
  const userFound = await User.findById(req.user.id);
  if (!userFound)
    return res.status(400).json({ message: 'Usuario no encontrado' });

  res.json({
    id: userFound._id,
    nombre: userFound.nombre,
    apellido: userFound.apellido,
    email: userFound.email,
    rol: userFound.rol,
    createdAt: userFound.createdAt,
    updateAt: userFound.updatedAt,
  });
};

export const verifyToken = async (req, res) => {
  const { token } = req.cookies;
  if (!token) return res.send(false);

  jwt.verify(token, TOKEN_SECRET, async (error, user) => {
    if (error) return res.sendStatus(401);

    const userFound = await User.findById(user.id);
    if (!userFound) return res.sendStatus(401);

    return res.json({
      id: userFound._id,
      nombre: userFound.nombre,
      email: userFound.email,
      rol: userFound.rol,
    });
  });
};

export const solicitarRecuperacion = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    const token = crypto.randomBytes(8).toString('hex');
    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hora
    await user.save();

    const mailOptions = {
      to: user.email,
      from: process.env.EMAIL,
      subject: 'Recuperación de contraseña',
      html: `<!doctype html>
<html>
  <head>
    <meta name="viewport" content="width=device-width">
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>Simple Call To Action</title>
  <style>
@media only screen and (max-width: 620px) {
  table[class='body'] h1 {
    font-size: 28px !important;
    margin-bottom: 10px !important;
  }

  table[class='body'] p,
table[class='body'] ul,
table[class='body'] ol,
table[class='body'] td,
table[class='body'] span,
table[class='body'] a {
    font-size: 16px !important;
  }

  table[class='body'] .wrapper,
table[class='body'] .article {
    padding: 10px !important;
  }

  table[class='body'] .content {
    padding: 0 !important;
  }

  table[class='body'] .container {
    padding: 0 !important;
    width: 100% !important;
  }

  table[class='body'] .main {
    border-left-width: 0 !important;
    border-radius: 0 !important;
    border-right-width: 0 !important;
  }

  table[class='body'] .btn table {
    width: 100% !important;
  }

  table[class='body'] .btn a {
    width: 100% !important;
  }

  table[class='body'] .img-responsive {
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

  .btn-primary table td:hover {
    background-color: #d5075d !important;
  }

  .btn-primary a:hover {
    background-color: #d5075d !important;
    border-color: #d5075d !important;
  }
}
</style></head>
  <body class style="background-color: #1A1F25; font-family: Helvetica; -webkit-font-smoothing: antialiased; font-size: 14px; line-height: 1.4; margin: 0; padding: 0; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;">
    <table role="presentation" border="0" cellpadding="0" cellspacing="0" class="body" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; min-width: 100%; background-color: #1A1F25; width: 100%;" width="100%" bgcolor="#1A1F25">
      <tr>
        <td style="font-family: Helvetica; font-size: 14px; vertical-align: top;" valign="top">&nbsp;</td>
        <td class="container" style="font-family: Helvetica; font-size: 14px; vertical-align: top; display: block; max-width: 580px; padding: 10px; width: 580px; margin: 0 auto;" width="580" valign="top">
          <div class="header" style="padding: 20px 0;">
            <table role="presentation" border="0" cellpadding="0" cellspacing="0" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; min-width: 100%; width: 100%;" width="100%">
              <tr>
                <td class="align-center" style="font-family: Helvetica; font-size: 14px; vertical-align: top; text-align: center;" valign="top" align="center">
                  <a href="https://archived.com.ar" style="color: #ec0867; text-decoration: underline;"><img src="https://firebasestorage.googleapis.com/v0/b/archived-web.appspot.com/o/utils%2Farchived-logo-blanco.png?alt=media&token=24593a8b-f329-44d8-88d0-98678d1a3f6b" height="50" alt="Archived" style="border: none; -ms-interpolation-mode: bicubic; max-width: 100%;"></a>
                </td>
              </tr>
            </table>
          </div>
          <div class="content" style="box-sizing: border-box; display: block; margin: 0 auto; max-width: 580px; padding: 10px;">

            <table role="presentation" class="main" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; min-width: 100%; background: #f2f2f2; border-radius: 3px; width: 100%;" width="100%">

              <!-- START MAIN CONTENT AREA -->
              <tr>
                <td class="wrapper" style="font-family: Helvetica; font-size: 14px; vertical-align: top; box-sizing: border-box; padding: 20px;" valign="top">
                  <table role="presentation" border="0" cellpadding="0" cellspacing="0" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; min-width: 100%; width: 100%;" width="100%">
                    <tr>
                      <td style="font-family: Helvetica; font-size: 14px; vertical-align: top; text-align: center" valign="top">
                        <p>Por favor, haz clic en el siguiente enlace para restablecer tu contraseña:</p>
                       <a href={http://localhost:5173/reset/${token}}  style="padding: 10px; background:#1A1F25; border-radius: 5px; color: #f2f2f2; margin: 10px;">http://localhost:5173/reset/${token}</a>
                        <p>Si no solicitaste esto, ignora este correo.</p>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>

            <!-- END MAIN CONTENT AREA -->
            </table>

            <!-- START FOOTER -->
            <div class="footer" style="clear: both; margin-top: 10px; text-align: center; width: 100%;">
              <table role="presentation" border="0" cellpadding="0" cellspacing="0" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; min-width: 100%; width: 100%;" width="100%">
                <tr>
                  <td class="content-block" style="font-family: Helvetica; vertical-align: top; padding-bottom: 10px; padding-top: 10px; color: #9a9ea6; font-size: 12px; text-align: center;" valign="top" align="center">
                    <span class="apple-link" style="color: #9a9ea6; font-size: 12px; text-align: center;">Archived Calle Chacabuco 222, Oncativo, Córdoba, Argentina</span>
                    <br> Visita nuestra web <a href="https://archived.com.ar" style="text-decoration: underline; color: #9a9ea6; font-size: 12px; text-align: center;">aquí</a>.
                  </td>
                </tr>
              </table>
            </div>
            <!-- END FOOTER -->

          <!-- END CENTERED WHITE CONTAINER -->
          </div>
        </td>
        <td style="font-family: Helvetica; font-size: 14px; vertical-align: top;" valign="top">&nbsp;</td>
      </tr>
    </table>
  </body>
</html>`,
    };

    await sendMail(mailOptions);
  }

  res.send(
    `Si existe una cuenta con ese correo, se enviará un enlace de recuperación.`
  );
};

export const recuperarPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user)
      return res.status(400).send({ message: 'Token inválido o expirado' });

    user.password = await bcrypt.hash(newPassword, 10);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    res.status(200).send({ message: 'Contraseña actualizada correctamente' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

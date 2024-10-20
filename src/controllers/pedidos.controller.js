import Cliente from '../models/cliente.model.js';
import Direccion from '../models/direccion.model.js';
import Pedido from '../models/pedido.model.js';
import mongoose from 'mongoose';
import Producto from '../models/product.model.js';
import Discount from '../models/descuento.model.js';
import Coupon from '../models/cupones.model.js';
import { sendMail } from './email.controller.js';

// Función para calcular el precio con descuento
const calcularPrecioOrginal = (precio, descuento) => {
  return precio + precio * (descuento / 100);
};

// Función para aplicar cupones a un pedido
const aplicarCuponAPedido = async (totalConDescuento, codigoCupon) => {
  if (!codigoCupon) return totalConDescuento;
  const cupon = await Coupon.findOne({ _id: codigoCupon });
  if (!cupon || cupon.max_uses <= cupon.used_count) {
    throw new Error('Cupón inválido o expirado por uso');
  }

  const currentDate = new Date();
  if (currentDate < cupon.valid_from || currentDate > cupon.valid_until) {
    throw new Error('Cupón inválido o expirado por fecha');
  }

  // Restar un uso al cupón
  cupon.used_count += 1;
  await cupon.save();

  // Calcular el precio final con el descuento del cupón
  return calcularPrecioOrginal(totalConDescuento, cupon.discount_percentage);
};

export const getNextOrderNumber = async () => {
  // Obtener el último pedido creado
  const lastPedido = await Pedido.findOne().sort({ numero_pedido: -1 });

  if (!lastPedido) {
    // Si no hay pedidos previos, empieza con 00001
    return '00001';
  }

  // Incrementar el número de pedido
  const lastNumber = parseInt(lastPedido.numero_pedido, 10);
  const nextNumber = lastNumber + 1;

  // Formatear el número a 5 dígitos, con ceros a la izquierda
  return nextNumber.toString().padStart(5, '0');
};

export const createPedido = async (req, res) => {
  try {
    const {
      numero_pago,
      tipo_pago,
      estado_pago,
      user,
      nombre_envio,
      apellido_envio,
      documento_envio,
      email_envio,
      telefono_envio,
      direccion_envio,
      numero_direccion_envio,
      departamento_envio,
      piso_envio,
      ciudad_envio,
      provincia_envio,
      codigo_postal_envio,
      nombre_facturacion,
      apellido_facturacion,
      documento_facturacion,
      email_facturacion,
      telefono_facturacion,
      direccion_facturacion,
      numero_direccion_facturacion,
      departamento_facturacion,
      piso_facturacion,
      ciudad_facturacion,
      provincia_facturacion,
      codigo_postal_facturacion,
      productos,
      coupon,
      totalPagado,
    } = req.body;

    if (
      !direccion_facturacion ||
      !numero_direccion_facturacion ||
      !ciudad_facturacion ||
      !provincia_facturacion ||
      !nombre_facturacion ||
      !apellido_facturacion ||
      !documento_facturacion ||
      !email_facturacion ||
      !telefono_facturacion ||
      !productos ||
      //!totalPagado ||
      !numero_pago ||
      !Array.isArray(productos) ||
      productos.length === 0
    ) {
      return res
        .status(400)
        .json({ message: 'Complete los campos obligatorios' });
    }

    const numero_pedido = await getNextOrderNumber();

    const existingPedido = await Pedido.findOne({
      numero_pago: numero_pago,
    });
    if (existingPedido) {
      return res.json(existingPedido);
    }

    let clienteFacturacion = await Cliente.findOne({
      documento: documento_facturacion,
    });
    if (!clienteFacturacion) {
      clienteFacturacion = new Cliente({
        nombre: nombre_facturacion,
        apellido: apellido_facturacion,
        documento: documento_facturacion,
        email: email_facturacion,
        telefono: telefono_facturacion,
      });
      clienteFacturacion = await clienteFacturacion.save();
    }

    const direccionFacturacion = new Direccion({
      direccion: direccion_facturacion,
      numero: numero_direccion_facturacion,
      departamento: departamento_facturacion,
      piso: piso_facturacion,
      ciudad: ciudad_facturacion,
      provincia: provincia_facturacion,
      codigo_postal: codigo_postal_facturacion,
      cliente: clienteFacturacion._id,
    });

    const savedDireccionFacturacion = await direccionFacturacion.save();

    let clienteEnvio, savedDireccionEnvio;

    if (documento_envio) {
      clienteEnvio = await Cliente.findOne({ documento: documento_envio });
      if (!clienteEnvio) {
        clienteEnvio = new Cliente({
          nombre: nombre_envio,
          apellido: apellido_envio,
          documento: documento_envio,
          email: email_envio,
          telefono: telefono_envio,
        });
        clienteEnvio = await clienteEnvio.save();
      }

      const direccionEnvio = new Direccion({
        direccion: direccion_envio,
        numero: numero_direccion_envio,
        departamento: departamento_envio,
        piso: piso_envio,
        ciudad: ciudad_envio,
        provincia: provincia_envio,
        codigo_postal: codigo_postal_envio,
        cliente: clienteEnvio._id,
      });
      savedDireccionEnvio = await direccionEnvio.save();
    }

    const formatProduct = async (product) => {
      const productData = await Producto.findById(product.producto_id);

      const discounts = await Discount.find({
        product_id: product.producto_id,
      });

      let productWithDiscount = null;

      if (discounts.length > 0) {
        const discount = discounts[0];
        const discountAmount =
          productData.precio * (discount.discount_percentage / 100);

        // Crear la respuesta con los datos del producto y el descuento
        productWithDiscount = {
          ...productData.toObject(), // Convertir el documento de Mongoose a un objeto plano
          precio_con_descuento: productData.precio - discountAmount,
          discount: {
            id: discount._id,
            discount_percentage: discount.discount_percentage,
            start_date: discount.start_date,
            end_date: discount.end_date,
          },
        };
      }

      const porductsData = productWithDiscount || productData.toObject();

      return {
        producto_id: product.producto_id,
        nombre: porductsData.nombre,
        cantidad: product.cantidad,
        talle: product.talle,
        categoria: porductsData.categoria,
        precio: porductsData.precio,
        precio_con_descuento: porductsData.discount
          ? porductsData.precio_con_descuento
          : undefined,
      };
    };

    const productosFormateados = await Promise.all(
      productos.map(formatProduct)
    );

    const totalSinDescuento = productosFormateados.reduce(
      (acc, item) => acc + item.precio * item.cantidad,
      0
    );

    const cupon = async () => {
      if (!coupon) return undefined;

      const cuponData = await Coupon.findById(coupon);
      if (!cuponData || cuponData.max_uses <= cuponData.used_count) {
        throw new Error('Cupón inválido o expirado por uso');
      }

      const currentDate = new Date();
      if (
        currentDate < cuponData.valid_from ||
        currentDate > cuponData.valid_until
      ) {
        throw new Error('Cupón inválido o expirado por fecha');
      }

      // Restar un uso al cupón
      cuponData.used_count += 1;
      await cuponData.save();

      return {
        discount_percentage: cuponData.discount_percentage,
        code: cuponData.code,
      };
    };

    // Ejecutar la función cupon y manejar su resultado
    const cuponResult = await cupon();

    const newPedido = new Pedido({
      numero_pedido: numero_pedido,
      cliente_facturacion: clienteFacturacion._id,
      direccion_facturacion: savedDireccionFacturacion._id,
      cliente_envio: clienteEnvio ? clienteEnvio._id : undefined,
      direccion_envio: savedDireccionEnvio
        ? savedDireccionEnvio._id
        : undefined,
      productos: productosFormateados,
      coupon: cuponResult
        ? `${cuponResult.code} - ${cuponResult.discount_percentage}`
        : undefined,
      total: coupon ? totalSinDescuento : totalPagado,
      total_con_descuento: coupon ? totalPagado : undefined,
      numero_pago: numero_pago ? numero_pago : undefined,
      tipo_pago: tipo_pago,
      estado_pago: estado_pago,
      user: user ? user : undefined,
    });

    const savedPedido = await newPedido.save();
    res.json(savedPedido);

    // Actualizar la propiedad de ventas de cada producto
    await Promise.all(
      productos.map(async (product) => {
        await Producto.findByIdAndUpdate(
          product.producto_id,
          { $inc: { ventas: 1 } },
          { new: true }
        );
      })
    );

    // Enviar mail de confirmación al usuario
    const to = email_facturacion; // Asegúrate de que el email del usuario esté disponible
    const subject = 'Compra confirmada';
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
          <body class style="background-color: #1A1F25; color: #f2f2f2; font-family: Helvetica, 'Helvetica Neue', Arial, 'Lucida Grande', sans-serif; -webkit-font-smoothing: antialiased; font-size: 14px; margin: 0; padding: 0; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;">
            <table role="presentation" border="0" cellpadding="0" cellspacing="0" class="body" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; min-width: 100%; background-color: #1A1F25; width: 100%;" width="100%" bgcolor="#1A1F25">
              <tr>
                <td style="font-family: sans-serif; font-size: 14px; vertical-align: top;" valign="top">&nbsp;</td>
                <td class="container" style="font-family: sans-serif; font-size: 14px; vertical-align: top; display: block; max-width: 580px; padding: 0px; width: 580px; Margin: 0 auto;" width="580" valign="top">

                  <div class="content" style="box-sizing: border-box; display: block; Margin: 0 auto; max-width: 580px; padding: 0px;">

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
                                <h2 style="color: #f2f2f2; font-family: Helvetica, 'Helvetica Neue', Arial, 'Lucida Grande', sans-serif; font-weight: 400; line-height: 1.4; margin: 0; margin-bottom: 10px;">Gracias por tu compra.</h2>
                                <p style="font-family: Helvetica, 'Helvetica Neue', Arial, 'Lucida Grande', sans-serif; font-size: 14px; font-weight: normal; margin: 0; margin-bottom: 15px;">Tu pago fue recibido con exito!</p>
                                <p style="font-family: Helvetica, 'Helvetica Neue', Arial, 'Lucida Grande', sans-serif; font-size: 14px; font-weight: normal; margin: 0; margin-bottom: 15px;">Acontinuacion te dejaremos un detalle de tu pedido</p>
                                <table role="presentation" border="0" cellpadding="0" cellspacing="0" class="btn btn-primary" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; min-width: 100%; box-sizing: border-box; width: 100%;" width="100%">
                                  <tbody>
                                    <tr>
                                      <td align="center" style="font-family: sans-serif; font-size: 14px; vertical-align: top; padding-bottom: 15px;" valign="top">
                                        <table role="presentation" border="0" cellpadding="0" cellspacing="0" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; min-width: auto; width: auto;" width="auto">
                                          <tbody>
                                            <tr>
                                              <p class="small" style="font-family: Helvetica, 'Helvetica Neue', Arial, 'Lucida Grande', sans-serif; font-weight: normal; margin: 0; font-size: 12px; margin-bottom: 5px;">Número de pago: <strong>#${
                                                savedPedido.numero_pedido
                                              }</strong></p>
                                            </tr>
                                          </tbody>
                                        </table>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                                <table class="tabla-producto" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; min-width: 100%; width: 100%; border: 1px solid #f2f2f2;" width="100%">
                                  <tbody>
                                  <tr class="tabla-header" style="background: #2d333b56; border: 1px solid #f2f2f2; width: 100%;">
                                    <td class="inicio" style="font-family: sans-serif; font-size: 14px; vertical-align: top; text-align: start; padding: 10px; width: calc(100% / 3);" width="calc(100% / 3)" valign="top" align="start">Producto</td>
                                    <td class="medio" style="font-family: sans-serif; font-size: 14px; vertical-align: top; text-align: center; padding: 10px; width: calc(100% / 3);" width="calc(100% / 3)" valign="top" align="center">Cantindad</td>
                                    <td class="final" style="font-family: sans-serif; font-size: 14px; vertical-align: top; text-align: end; padding: 10px; width: calc(100% / 3);" width="calc(100% / 3)" valign="top" align="end">Subtotal</td>
                                  </tr>

                                  ${productos
                                    .map(
                                      (item) => `
                                    <tr>
                                      <td class="inicio" style="font-family: sans-serif; font-size: 14px; vertical-align: top; text-align: start; padding: 10px; width: calc(100% / 3);" width="calc(100% / 3)" valign="top" align="start">${item.nombre}</td>
                                      <td class="medio" style="font-family: sans-serif; font-size: 14px; vertical-align: top; text-align: center; padding: 10px; width: calc(100% / 3);" width="calc(100% / 3)" valign="top" align="center">${item.cantidad}</td>
                                      <td class="final" style="font-family: sans-serif; font-size: 14px; vertical-align: top; text-align: end; padding: 10px; width: calc(100% / 3);" width="calc(100% / 3)" valign="top" align="end">$${item.precio}</td>
                                    </tr>
                                  `
                                    )
                                    .join('')}
                                  
                                  <tr class="tabla-header" style="background: #2d333b56; border: 1px solid #f2f2f2; width: 100%;">
                                    <td class="inicio" style="font-family: sans-serif; font-size: 14px; vertical-align: top; text-align: start; padding: 10px; width: calc(100% / 3);" width="calc(100% / 3)" valign="top" align="start">Total:</td>
                                    <td class="medio" style="font-family: sans-serif; font-size: 14px; vertical-align: top; text-align: center; padding: 10px; width: calc(100% / 3);" width="calc(100% / 3)" valign="top" align="center"></td>
                                    <td class="final" style="font-family: sans-serif; font-size: 14px; vertical-align: top; text-align: end; padding: 10px; width: calc(100% / 3);" width="calc(100% / 3)" valign="top" align="end">$${totalPagado}</td>
                                  </tr>
                                  </tbody>
                                </table>
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
  } catch (error) {
    console.error('Error en la creación del pedido:', error);
    res
      .status(500)
      .json({ message: 'Error al generar el pedido', error: error.message });
  }
};

export const getPedido = async (req, res) => {
  try {
    const pedido = await Pedido.findById(req.params.id)
      .populate('cliente_facturacion')
      .populate('direccion_facturacion')
      .populate('cliente_envio')
      .populate('direccion_envio')
      .populate('user');

    if (!pedido) {
      return res.status(404).json({ message: 'Pedido no encontrado' });
    }

    res.json(pedido);
  } catch (error) {
    console.error('Error al obtener el pedido:', error);
    return res.status(500).json({ message: 'Error al obtener el pedido' });
  }
};

export const getPedidos = async (req, res) => {
  try {
    const pedidos = await Pedido.find()
      .populate('cliente_facturacion')
      .populate('direccion_facturacion')
      .populate('cliente_envio')
      .populate('direccion_envio')
      .populate('user'); // Asegúrate de poblar el usuario también
    res.json(pedidos);
  } catch (error) {
    console.error('Error al recuperar los pedidos:', error);
    res.status(500).json({
      message: 'Error al recuperar los pedidos',
      error: error.message,
    });
  }
};

export const getPedidoUser = async (req, res) => {
  try {
    const userId = req.params.id;

    // Verifica si el ID proporcionado es un ObjectId válido
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: 'ID de usuario inválido' });
    }

    const pedidos = await Pedido.find({ user: userId })
      .populate('cliente_facturacion')
      .populate('direccion_facturacion')
      .populate('cliente_envio')
      .populate('direccion_envio')
      .populate('user'); // Asegúrate de poblar el usuario también

    if (!pedidos.length) {
      return res
        .status(404)
        .json({ message: 'No se encontraron pedidos para este usuario' });
    }

    res.json(pedidos);
  } catch (error) {
    console.error('Error al recuperar los pedidos del usuario:', error);
    return res.status(500).json({
      message: 'Error al recuperar los pedidos del usuario',
      error: error.message,
    });
  }
};

export const getPedidoNroPago = async (req, res) => {
  try {
    const pedido = await Pedido.findOne({ numero_pago: req.params.id })
      .populate('cliente_facturacion')
      .populate('direccion_facturacion')
      .populate('cliente_envio')
      .populate('direccion_envio')
      .populate('user');

    if (!pedido) {
      return res.status(404).json({ message: 'Pedido no encontrado' });
    }

    res.json(pedido);
  } catch (error) {
    console.error('Error al obtener el pedido:', error);
    return res.status(500).json({ message: 'Error al obtener el pedido' });
  }
};

export const updatePedido = async (req, res) => {
  try {
    const pedidoId = req.params.id;
    const update = req.body;

    // Verifica si el ID proporcionado es un ObjectId válido
    if (!mongoose.Types.ObjectId.isValid(pedidoId)) {
      return res.status(400).json({ message: 'ID de pedido inválido' });
    }

    const updatedPedido = await Pedido.findByIdAndUpdate(pedidoId, update, {
      new: true,
    });

    if (!updatedPedido) {
      return res.status(404).json({ message: 'Pedido no encontrado' });
    }

    res.json(updatedPedido);
  } catch (error) {
    console.error('Error al actualizar el pedido:', error);
    return res.status(500).json({ message: 'Error al actualizar el pedido' });
  }
};

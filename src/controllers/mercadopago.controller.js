import mercadopago from 'mercadopago';
import { MERCADOPAGO_ACCESS_TOKEN } from '../config.js';
import { getNextOrderNumber } from './pedidos.controller.js';
import Cliente from '../models/cliente.model.js';
import Direccion from '../models/direccion.model.js';
import Pedido from '../models/pedido.model.js';
import Producto from '../models/product.model.js';
import Discount from '../models/descuento.model.js';
import Coupon from '../models/cupones.model.js';
import { sendMail } from './email.controller.js';
import { io, socketId } from '../../index.js';

mercadopago.configure({
  access_token: MERCADOPAGO_ACCESS_TOKEN,
});

export const createOrder = async (req, res) => {
  const { productos, shippingCost, shippingDetails } = req.body; // Asegúrate de que

  const arrayProducto = productos.map((producto) => {
    return {
      id: producto.id,
      title: producto.nombre,
      unit_price: producto.precio,
      currency_id: 'ARS',
      quantity: producto.cantidad,
      description: producto.talle,
    };
  });

  if (shippingCost) {
    arrayProducto.push({
      id: 'shipping',
      title: 'Costo de Envío',
      unit_price: Number(shippingCost),
      currency_id: 'ARS',
      quantity: 1,
      description: 'Envío del pedido',
    });
  }

  try {
    const preferences = {
      items: arrayProducto,
      notification_url:
        'https://archived-web-1.onrender.com/api/mercado-pago/webhook',
      back_urls: {
        success: 'https://www.archived.com.ar/checkout/pago/success',
        failure: 'https://www.archived.com.ar/checkout/pago',
        pending: 'https://www.archived.com.ar/pending',
      },
      auto_return: 'approved',
      metadata: {
        shippingDetails, // Añade los detalles de envío aquí
        productos, // Añade los productos aquí
      },
    };

    const result = await mercadopago.preferences.create(preferences);
    console.log(result);

    res.status(200).json(result.response.init_point);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: error.message });
  }
};

export const reciverWebhook = async (req, res) => {
  try {
    const payment = req.body;
    //console.log(payment);

    if (payment.type === 'payment') {
      const paymentId = payment.data.id;

      const paymentDetails = await mercadopago.payment.findById(paymentId);
      //console.log('Detalle:', paymentDetails.response.transaction_amount);
      // Recupera la información de metadata
      const metadata = paymentDetails.response.metadata;

      const productos = metadata.productos;

      const shippingDetails = metadata.shipping_details;
      //console.log('Detalle de pedido', shippingDetails);

      // Aquí se crea el pedido usando los detalles de envío y otros datos relevantes
      const numero_pedido = await getNextOrderNumber();

      const existingPedido = await Pedido.findOne({
        numero_pago: paymentId,
      });
      if (existingPedido) {
        return res.json(existingPedido);
      }

      let clienteFacturacion = await Cliente.findOne({
        documento: shippingDetails.documento_facturacion,
      });

      if (!clienteFacturacion) {
        clienteFacturacion = new Cliente({
          nombre: shippingDetails.nombre_facturacion,
          apellido: shippingDetails.apellido_facturacion,
          documento: shippingDetails.documento_facturacion,
          email: shippingDetails.email_facturacion,
          telefono: shippingDetails.telefono_facturacion,
        });
        clienteFacturacion = await clienteFacturacion.save();
      }

      const direccionFacturacion = new Direccion({
        direccion: shippingDetails.direccion_facturacion,
        numero: shippingDetails.numero_direccion_facturacion,
        departamento: shippingDetails.departamento_facturacion,
        piso: shippingDetails.piso_facturacion,
        ciudad: shippingDetails.ciudad_facturacion,
        provincia: shippingDetails.provincia_facturacion,
        codigo_postal: shippingDetails.codigo_postal_facturacion,
        cliente: clienteFacturacion._id,
      });

      const savedDireccionFacturacion = await direccionFacturacion.save();

      let clienteEnvio, savedDireccionEnvio;

      if (shippingDetails.documento_envio) {
        clienteEnvio = await Cliente.findOne({
          documento: shippingDetails.documento_envio,
        });
        if (!clienteEnvio) {
          clienteEnvio = new Cliente({
            nombre: shippingDetails.nombre_envio,
            apellido: shippingDetails.apellido_envio,
            documento: shippingDetails.documento_envio,
            email: shippingDetails.email_envio,
            telefono: shippingDetails.telefono_envio,
          });
          clienteEnvio = await clienteEnvio.save();
        }

        const direccionEnvio = new Direccion({
          direccion: shippingDetails.direccion_envio,
          numero: shippingDetails.numero_direccion_envio,
          departamento: shippingDetails.departamento_envio,
          piso: shippingDetails.piso_envio,
          ciudad: shippingDetails.ciudad_envio,
          provincia: shippingDetails.provincia_envio,
          codigo_postal: shippingDetails.codigo_postal_envio,
          cliente: clienteEnvio._id,
        });
        savedDireccionEnvio = await direccionEnvio.save();
      }

      const formatProduct = async (product) => {
        try {
          const productData = await Producto.findById(product.id);
          if (!productData) {
            throw new Error(`Producto no encontrado para el ID: ${product.id}`);
          }

          const discounts = await Discount.find({
            product_id: product.id,
          });
          let productWithDiscount = null;

          if (discounts.length > 0) {
            const discount = discounts[0];
            const discountAmount =
              productData.precio * (discount.discount_percentage / 100);

            productWithDiscount = {
              ...productData.toObject(),
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
            producto_id: product.id,
            nombre: porductsData.nombre,
            cantidad: product.cantidad,
            talle: product.talle,
            categoria: porductsData.categoria,
            precio: porductsData.precio,
            precio_con_descuento: porductsData.discount
              ? porductsData.precio_con_descuento
              : undefined,
          };
        } catch (error) {
          console.error(`Error formateando producto: ${error.message}`);
          throw error; // Propagar el error para que sea manejado más arriba
        }
      };

      const productosFormateados = await Promise.all(
        productos.map(formatProduct)
      );

      const totalSinDescuento = productosFormateados.reduce(
        (acc, item) => acc + item.precio * item.cantidad,
        0
      );

      const cupon = async () => {
        if (!shippingDetails.coupon) return undefined;

        const cuponData = await Coupon.findById(shippingDetails.coupon);
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
        total: shippingDetails.coupon
          ? totalSinDescuento
          : paymentDetails.response.transaction_amount,
        total_con_descuento: shippingDetails.coupon
          ? paymentDetails.response.transaction_amount
          : undefined,
        numero_pago: paymentId,
        tipo_pago: 'Mercado Pago',
        estado_pago: paymentDetails.response.status,
        user: paymentDetails.user ? paymentDetails.user : undefined,
      });
      const savedPedido = await newPedido.save();
      //console.log('Pedido', savedPedido);

      // Emitir evento de WebSocket para vaciar el carrito
      //io.emit('vaciarCarrito', { paymentId });

      console.log(savedPedido);

      // Actualizar la propiedad de venta de los productos
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
      const to = shippingDetails.email_facturacion; // Asegúrate de que el email del usuario esté disponible
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

                                  ${savedPedido.productos
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
                                    <td class="final" style="font-family: sans-serif; font-size: 14px; vertical-align: top; text-align: end; padding: 10px; width: calc(100% / 3);" width="calc(100% / 3)" valign="top" align="end">$${
                                      paymentDetails.response.transaction_amount
                                    }</td>
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

      io.emit('paymentApproved', socketId);
      return res.json(savedPedido);
    }

    return res.sendStatus(204); // Responde con un estado 204 (No Content)
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
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

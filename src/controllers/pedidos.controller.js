import Cliente from '../models/cliente.model.js';
import Direccion from '../models/direccion.model.js';
import Pedido from '../models/pedido.model.js';
import mongoose from 'mongoose';
import Producto from '../models/product.model.js';
import Discount from '../models/descuento.model.js';
import Coupon from '../models/cupones.model.js';

// Función para calcular el precio con descuento
const calcularPrecioConDescuento = (precio, descuento) => {
  return precio - precio * (descuento / 100);
};

// Función para aplicar descuentos a los productos
const aplicarDescuentosAProductos = async (productos) => {
  const descuentos = await Discount.find();
  let total = 0;
  let totalConDescuento = 0;

  const productosConDescuento = await Promise.all(
    productos.map(async (item) => {
      const producto = await Producto.findById(item.product_id);
      let precioConDescuento = producto.precio;

      const descuentoProducto = descuentos.find(
        (descuento) => descuento.product_id.toString() === item.product_id
      );
      if (descuentoProducto) {
        precioConDescuento = calcularPrecioConDescuento(
          precioConDescuento,
          descuentoProducto.discount_percentage
        );
      }

      total += producto.precio * item.cantidad;
      totalConDescuento += precioConDescuento * item.cantidad;

      return { ...item, precio_con_descuento: precioConDescuento };
    })
  );

  return { productosConDescuento, total, totalConDescuento };
};

// Función para aplicar cupones a un pedido
const aplicarCuponAPedido = async (totalConDescuento, codigoCupon) => {
  if (!codigoCupon) return totalConDescuento;

  const cupon = await Coupon.findOne({ code: codigoCupon });
  if (!cupon || cupon.used_count >= cupon.max_uses) {
    throw new Error('Cupón inválido o expirado');
  }

  const currentDate = new Date();
  if (currentDate < cupon.valid_from || currentDate > cupon.valid_until) {
    throw new Error('Cupón inválido o expirado');
  }

  cupon.used_count += 1;
  await cupon.save();

  return calcularPrecioConDescuento(
    totalConDescuento,
    cupon.discount_percentage
  );
};

export const createPedido = async (req, res) => {
  try {
    const {
      numero_pedido,
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
      codigoCupon,
    } = req.body;

    if (
      !direccion_facturacion ||
      !numero_direccion_facturacion ||
      !ciudad_facturacion ||
      !provincia_facturacion ||
      !numero_pedido ||
      !nombre_facturacion ||
      !apellido_facturacion ||
      !documento_facturacion ||
      !email_facturacion ||
      !telefono_facturacion ||
      !productos ||
      !Array.isArray(productos) ||
      productos.length === 0
    ) {
      return res
        .status(400)
        .json({ message: 'Complete los campos obligatorios' });
    }

    const existingPedido = await Pedido.findOne({
      numero_pedido: numero_pedido,
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

    const { productosConDescuento, total, totalConDescuento } =
      await aplicarDescuentosAProductos(productos);

    const totalConCupon = await aplicarCuponAPedido(
      totalConDescuento,
      codigoCupon
    );

    const newPedido = new Pedido({
      numero_pedido,
      cliente_facturacion: clienteFacturacion._id,
      direccion_facturacion: savedDireccionFacturacion._id,
      cliente_envio: clienteEnvio ? clienteEnvio._id : undefined,
      direccion_envio: savedDireccionEnvio
        ? savedDireccionEnvio._id
        : undefined,
      productos: productosConDescuento,
      cupon: codigoCupon,
      total,
      total_con_descuento: totalConCupon,
      user: user ? user : undefined,
    });

    const savedPedido = await newPedido.save();
    res.json(savedPedido);
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

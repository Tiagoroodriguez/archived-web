import Cliente from '../models/cliente.model.js';
import Direccion from '../models/direccion.model.js';
import Pedido from '../models/pedido.model.js';

export const createPedido = async (req, res) => {
  try {
    const {
      // Datos del pedido
      numero_pedido,

      // Datos del cliente de envío
      nombre_envio,
      apellido_envio,
      documento_envio,
      email_envio,
      telefono_envio,

      // Datos de envío
      direccion_envio,
      numero_direccion_envio,
      departamento_envio,
      ciudad_envio,
      provincia_envio,
      codigo_postal_envio,

      // Datos del cliente de facturación
      nombre_facturacion,
      apellido_facturacion,
      documento_facturacion,
      email_facturacion,
      telefono_facturacion,

      // Datos de facturación
      direccion_facturacion,
      numero_direccion_facturacion,
      departamento_facturacion,
      ciudad_facturacion,
      provincia_facturacion,
      codigo_postal_facturacion,

      // Productos
      productos,
    } = req.body;

    // Validar que todos los campos requeridos están presentes
    if (
      !direccion_facturacion ||
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

    // Verificar si el pedido ya existe
    const existingPedido = await Pedido.findOne({ numero_pedido });
    if (existingPedido) {
      return res.json(existingPedido);
    }

    // Buscar o crear el cliente de facturación
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

    // Crear la dirección de facturación
    const direccionFacturacion = new Direccion({
      direccion: direccion_facturacion,
      numero: numero_direccion_facturacion,
      departamento: departamento_facturacion,
      ciudad: ciudad_facturacion,
      provincia: provincia_facturacion,
      codigo_postal: codigo_postal_facturacion,
      cliente: clienteFacturacion._id,
    });
    const savedDireccionFacturacion = await direccionFacturacion.save();

    let clienteEnvio, savedDireccionEnvio;

    // Si se proporciona información de envío, buscar o crear el cliente de envío
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

      // Crear la dirección de envío
      const direccionEnvio = new Direccion({
        direccion: direccion_envio,
        numero: numero_direccion_envio,
        departamento: departamento_envio,
        ciudad: ciudad_envio,
        provincia: provincia_envio,
        codigo_postal: codigo_postal_envio,
        cliente: clienteEnvio._id,
      });
      savedDireccionEnvio = await direccionEnvio.save();
    }

    // Crear un nuevo documento de pedido
    const newPedido = new Pedido({
      numero_pedido,
      cliente_facturacion: clienteFacturacion._id,
      direccion_facturacion: savedDireccionFacturacion._id,
      cliente_envio: clienteEnvio ? clienteEnvio._id : undefined,
      direccion_envio: savedDireccionEnvio
        ? savedDireccionEnvio._id
        : undefined,
      productos,
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
      .populate('direccion_envio');

    if (!pedido)
      return res.status(404).json({ message: 'Pedido no encontrado' });
    res.json(pedido);
  } catch (error) {
    return res.status(404).json({ message: 'Pedido no encontrado' });
  }
};

import Direccion from '../models/direccion.model.js';
import Pedido from '../models/pedido.model.js';

export const createPedido = async (req, res) => {
  try {
    const {
      // Datos de envío
      direccion_envio,
      numero_direccion_envio,
      departamento_envio,
      ciudad_envio,
      provincia_envio,
      codigo_postal_envio,

      // Datos de facturación
      direccion_facturacion,
      numero_direccion_facturacion,
      departamento_envio_facturacion,
      ciudad_facturacion,
      provincia_facturacion,
      codigo_postal_facturacion,
      numero_pedido,

      // Datos del cliente para el Pedido
      nombre,
      apellido,
      documento,
      email,
      telefono,
      productos,
    } = req.body;

    if (
      // Validacion de datos obligatorios
      !direccion_envio ||
      !ciudad_envio ||
      !codigo_postal_envio ||
      !provincia_envio ||
      !direccion_facturacion ||
      !ciudad_facturacion ||
      !provincia_facturacion ||
      !numero_pedido ||
      !nombre ||
      !apellido ||
      !documento ||
      !email ||
      !telefono ||
      !productos
    ) {
      return res
        .status(400)
        .json({ message: 'Complete los campos obligatorios' });
    }

    // Crear un nuevo documento de dirección
    const newDireccion = new Direccion({
      direccion_envio,
      numero_direccion_envio,
      departamento_envio,
      ciudad_envio,
      provincia_envio,
      codigo_postal_envio,
      direccion_facturacion,
      numero_direccion_facturacion,
      departamento_envio_facturacion,
      ciudad_facturacion,
      provincia_facturacion,
      codigo_postal_facturacion,
      numero_pedido,
    });

    const savedDireccion = await newDireccion.save();

    // Crear un nuevo documento de pedido
    const newPedido = new Pedido({
      numero_pedido: savedDireccion.numero_pedido,
      nombre,
      apellido,
      documento,
      email,
      telefono,
      productos,
      direcciones: savedDireccion._id, // ID del envío guardado
    });

    const savedPedido = await newPedido.save();
    res.json(savedPedido);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al generar el pedido' });
  }
};

export const getPedido = async (req, res) => {
  try {
    const pedido = await Pedido.findById(req.params.id).populate(
      'direcciones',
      {
        _id: 0,
        direccion_envio: 1,
        numero_direccion_envio: 1,
        departamento_envio: 1,
        ciudad_envio: 1,
        provincia_envio: 1,
        codigo_postal_envio: 1,
        direccion_facturacion: 1,
        numero_direccion_facturacion: 1,
        departamento_envio_facturacion: 1,
        ciudad_facturacion: 1,
        provincia_facturacion: 1,
        codigo_postal_facturacion: 1,
      }
    );
    if (!pedido)
      return res.status(404).json({ message: 'Pedido no encontrado' });
    res.json(pedido);
  } catch (error) {
    return res.status(404).json({ message: 'Pedido no encontrado' });
  }
};

export const updatePedido = async (req, res) => {
  try {
    const pedido = await Pedido.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!pedido)
      return res.status(404).json({ message: 'Pedido no encontrado' });
    res.json(pedido);
  } catch (error) {
    return res.status(404).json({ message: 'Pedido no encontrado' });
  }
};

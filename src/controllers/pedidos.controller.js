import Cliente from '../models/cliente.model.js';
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

      // Datos del pedido
      numero_pedido,

      // Datos del cliente
      nombre,
      apellido,
      documento,
      email,
      telefono,

      // Productos
      productos,
    } = req.body;

    // Validar que todos los campos requeridos están presentes
    if (
      !direccion_envio ||
      !ciudad_envio ||
      !provincia_envio ||
      !codigo_postal_envio ||
      !direccion_facturacion ||
      !ciudad_facturacion ||
      !provincia_facturacion ||
      !numero_pedido ||
      !nombre ||
      !apellido ||
      !documento ||
      !email ||
      !telefono ||
      !productos ||
      !Array.isArray(productos) ||
      productos.length === 0
    ) {
      return res
        .status(400)
        .json({ message: 'Complete los campos obligatorios' });
    }

    // Verificar si el cliente ya existe
    let cliente = await Cliente.findOne({ documento });

    if (!cliente) {
      // Crear un nuevo cliente si no existe
      cliente = new Cliente({
        nombre,
        apellido,
        documento,
        email,
        telefono,
      });
      await cliente.save();
    }

    // Crear o buscar la dirección
    const direccion = new Direccion({
      envio: {
        direccion: direccion_envio,
        numero: numero_direccion_envio,
        departamento: departamento_envio,
        ciudad: ciudad_envio,
        provincia: provincia_envio,
        codigo_postal: codigo_postal_envio,
      },
      facturacion: {
        direccion: direccion_facturacion,
        numero: numero_direccion_facturacion,
        departamento: departamento_envio_facturacion,
        ciudad: ciudad_facturacion,
        provincia: provincia_facturacion,
        codigo_postal: codigo_postal_facturacion,
      },
    });

    const savedDireccion = await direccion.save();

    // Crear un nuevo documento de pedido
    const newPedido = new Pedido({
      numero_pedido,
      cliente: cliente._id,
      direcciones: savedDireccion._id,
      productos,
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
    const pedido = await Pedido.findById(req.params.id)
      .populate('cliente', {
        nombre: 1,
        apellido: 1,
        documento: 1,
        email: 1,
        telefono: 1,
        _id: 0,
      })
      .populate('direcciones', {
        envio: 1,
        facturacion: 1,
        _id: 0,
      });

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

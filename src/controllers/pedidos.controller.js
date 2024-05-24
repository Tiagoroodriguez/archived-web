import Envio from '../models/envio.model.js';
import Pedido from '../models/pedido.model.js';

export const createPedido = async (req, res) => {
  try {
    const { numero_pedido, estado, informacion_envio } = req.body;

    if (!numero_pedido || !informacion_envio) {
      return res
        .status(400)
        .json({ message: 'Todos los campos son obligatorios' });
    }

    const newPedido = new Pedido({
      numero_pedido,
      estado,
      informacion_envio,
    });

    const savedPedido = await newPedido.save();
    res.json(savedPedido);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Algo salió mal' });
  }
};

export const getPedido = async (req, res) => {
  try {
    const pedido = await Pedido.findById(req.params.id);
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
      return res.status(404).json({ message: 'pedido no encontrado' });
    res.json(pedido);
  } catch (error) {
    return res.status(404).json({ message: 'pedido no encontrado' });
  }
};

export const registrarEnvio = async (req, res) => {
  try {
    const {
      nombre,
      apellido,
      direccion,
      numero_direccion,
      ciudad,
      codigo_postal,
      telefono,
      email,
      numero_pedido,
    } = req.body;

    if (
      !nombre ||
      !apellido ||
      !direccion ||
      !numero_direccion ||
      !ciudad ||
      !codigo_postal ||
      !telefono ||
      !email
    ) {
      return res
        .status(400)
        .json({ message: 'Todos los campos son obligatorios' });
    }

    const newEnvio = new Envio({
      nombre,
      apellido,
      direccion,
      numero_direccion,
      ciudad,
      codigo_postal,
      telefono,
      email,
      numero_pedido,
    });

    const savedEnvio = await newEnvio.save();

    const newPedido = new Pedido({
      numero_pedido: 1, // Puedes cambiar esto si lo necesitas
      informacion_envio: savedEnvio._id, // ID del envío guardado
    });

    const savedPedido = await newPedido.save();
    res.json(savedPedido);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Algo salió mal' });
  }
};

export const getEnvio = async (req, res) => {
  try {
    const envio = await Envio.findById(req.params.id);
    if (!envio) return res.status(404).json({ message: 'Envio no encontrado' });
    res.json(envio);
  } catch (error) {
    return res.status(404).json({ message: 'Envio no encontrado' });
  }
};

export const modificarEnvio = async (req, res) => {
  try {
    const envio = await Envio.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!envio) return res.status(404).json({ message: 'Envio no encontrado' });
    res.json(envio);
  } catch (error) {
    return res.status(404).json({ message: 'Envio no encontrado' });
  }
};

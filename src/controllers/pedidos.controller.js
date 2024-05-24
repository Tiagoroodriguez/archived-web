import Envio from '../models/envio.model.js';

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
      !email ||
      !numero_pedido
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
    res.json(savedEnvio);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Algo salió mal' });
  }
};

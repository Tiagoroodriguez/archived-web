import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import { createAccessToken } from '../libs/jwt.js';
import { TOKEN_SECRET } from '../config.js';
import jwt from 'jsonwebtoken';

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
      nombre: userFound.username,
      email: userFound.email,
    });
  });
};

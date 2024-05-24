import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';
import { TOKEN_SECRET } from '../config.js';

export const checkRoleAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      return res
        .status(401)
        .json({ message: 'No token provided, authorization denied' });
    }

    const decoded = jwt.verify(token, TOKEN_SECRET);

    const userFound = await User.findById(decoded.id);
    if (!userFound) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (userFound.rol !== 'admin') {
      return res
        .status(403)
        .json({ message: 'No tienes permisos para acceder a este recurso' });
    }

    req.user = userFound;
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

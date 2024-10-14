import express from 'express';
import Product from '../models/product.model.js';

const router = express.Router();

router.get('/search', async (req, res) => {
  const { query, collection } = req.query;

  if (!query) {
    return res.status(400).json({ message: 'Query parameter is required' });
  }

  try {
    // Buscar en los productos por nombre, descripción, categoría y colección
    const productsByName = await Product.find({
      nombre: { $regex: query, $options: 'i' },
    });

    const productsByDescription = await Product.find({
      descripcion: { $regex: query, $options: 'i' },
    });

    const productsByCategory = await Product.find({
      categoria: { $regex: query, $options: 'i' },
    });

    const productsByCollection = collection
      ? await Product.find({
          coleccion: collection,
        })
      : [];

    // Combinar todos los resultados en un solo array y eliminar duplicados
    const allProducts = [
      ...productsByName,
      ...productsByDescription,
      ...productsByCategory,
      ...productsByCollection,
    ].reduce((acc, product) => {
      if (!acc.find((p) => p._id.equals(product._id))) {
        acc.push(product);
      }
      return acc;
    }, []);

    // Agregar otras búsquedas específicas aquí
    const pages = [
      { name: 'Preguntas Frecuentes', url: '/faq' },
      { name: 'Colección 2024', url: '/coleccion-2024' },
      { name: 'Guía de talles', url: '/guia-de-talles' },
      { name: 'Contacto', url: '/contacto' },
      { name: 'tienda', url: '/tienda' },
      { name: 'remeras', url: '/tienda?categoria=remera' },
      { name: 'buzos', url: '/tienda?categoria=buzo' },
      { name: 'Inicio', url: '/' },
      { name: 'Registro', url: '/registro' },
      { name: 'Login', url: '/login' },
      { name: 'Politica de privacidad', url: 'privacy-policy' },
      { name: 'Terminos y condiciones', url: '/terms-of-service' },
      { name: 'Cambios y devoluciones', url: '/returns-exchanges' },
      { name: 'Politicas de envio', url: '/shipping-policy' },

      // Puedes agregar más páginas aquí
    ].filter((page) => page.name.toLowerCase().includes(query.toLowerCase()));

    res.json({ products: allProducts, pages });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error en la búsqueda', error: error.message });
  }
});

export default router;

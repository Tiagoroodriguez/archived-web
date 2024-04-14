import Product from '../models/product.model.js';

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    return res.status(500).json({ message: 'Something went wrong' });
  }
};

export const createProduct = async (req, res) => {
  try {
    const {
      nombre,
      categoria,
      precio,
      cant_s,
      cant_m,
      cant_l,
      cant_xl,
      cant_xxl,
    } = req.body;

    const newProduct = new Product({
      nombre,
      categoria,
      precio,
      cant_s,
      cant_m,
      cant_l,
      cant_xl,
      cant_xxl,
    });

    const savedProduct = await newProduct.save();
    res.json(savedProduct);
  } catch (error) {
    return res.status(500).json({ message: 'Something went wrong' });
  }
};

export const getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (error) {
    return res.status(404).json({ message: 'Producto no encontrado' });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    return res.sendStatus(204);
  } catch (error) {
    return res.status(404).json({ message: 'Producto no encontrado' });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (error) {
    return res.status(404).json({ message: 'Producto no encontrado' });
  }
};

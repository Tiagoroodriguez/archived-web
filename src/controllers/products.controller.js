import Product from '../models/product.model.js';

export const getProducts = async (req, res) => {
  try {
    const { limit, categoria } = req.query;
    let query = Product.find().sort({ _id: -1 });

    if (categoria) {
      query = query.where('categoria').equals(decodeURIComponent(categoria));
    }

    if (limit) {
      query = query.limit(parseInt(limit));
    }

    const products = await query;
    res.json(products);
  } catch (error) {
    return res.status(500).json({ message: 'Algo salió mal' });
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

export const updateProductStock = async (req, res) => {
  const { talle, quantity } = req.body;
  const { id } = req.params;

  try {
    // Encontrar el producto por ID
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }

    // Actualizar el stock según el talle
    switch (talle) {
      case 'S':
        if (product.cant_s < quantity) {
          return res.status(400).json({ message: 'Stock insuficiente' });
        }
        product.cant_s -= quantity;
        break;
      case 'M':
        if (product.cant_m < quantity) {
          return res.status(400).json({ message: 'Stock insuficiente' });
        }
        product.cant_m -= quantity;
        break;
      case 'L':
        if (product.cant_l < quantity) {
          return res.status(400).json({ message: 'Stock insuficiente' });
        }
        product.cant_l -= quantity;
        break;
      case 'XL':
        if (product.cant_xl < quantity) {
          return res.status(400).json({ message: 'Stock insuficiente' });
        }
        product.cant_xl -= quantity;
        break;
      case 'XXL':
        if (product.cant_xxl < quantity) {
          return res.status(400).json({ message: 'Stock insuficiente' });
        }
        product.cant_xxl -= quantity;
        break;
      default:
        console.log('Talle inválido');
        return res.status(400).json({ message: 'Talle inválido' });
    }

    // Guardar los cambios en el producto
    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } catch (error) {
    console.error('Error al actualizar el stock:', error);
    return res.status(500).json({ message: 'Algo salió mal' });
  }
};

export const getRecommendations = async (req, res) => {
  try {
    const { id } = req.params;
    const currentProduct = await Product.findById(id);

    if (!currentProduct) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }

    const recommendedProducts = await Product.find({
      categoria: currentProduct.categoria,
      _id: { $ne: currentProduct._id },
    }).limit(5);

    res.json(recommendedProducts);
  } catch (error) {
    console.error('Error al obtener recomendaciones:', error);
    return res.status(500).json({ message: 'Algo salió mal' });
  }
};

import Product from '../models/product.model.js';
import Coleccion from '../models/coleccion.model.js';
import Discount from '../models/descuento.model.js';

export const getProducts = async (req, res) => {
  try {
    const { limit, categoria } = req.query;
    let query = Product.find().sort({ _id: -1 }).populate('coleccion');

    if (categoria) {
      query = query.where('categoria').equals(decodeURIComponent(categoria));
    }

    if (limit) {
      query = query.limit(parseInt(limit));
    }

    const products = await query;

    // Obtener los descuentos actuales
    const discounts = await Discount.find({
      start_date: { $lte: new Date() },
      end_date: { $gte: new Date() },
      active: true,
    });

    // Aplicar descuentos a los productos
    const productsWithDiscounts = products.map((product) => {
      const discount = discounts.find(
        (discount) => discount.product_id.toString() === product._id.toString()
      );
      if (discount) {
        const discountAmount =
          product.precio * (discount.discount_percentage / 100);
        product.precio_con_descuento = product.precio - discountAmount;
        product.discount = discount.discount_percentage; // Añadir el porcentaje de descuento al producto
      } else {
        product.precio_con_descuento = product.precio;
        product.discount = 0; // Si no hay descuento, el porcentaje es 0
      }
      return product;
    });

    res.json(productsWithDiscounts);
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'Algo salió mal', error: error.message });
  }
};

export const createProduct = async (req, res) => {
  try {
    const {
      nombre,
      categoria,
      coleccion, // Cambiar a coleccionId
      descripcion,
      precio,
      cant_s,
      cant_m,
      cant_l,
      cant_xl,
      cant_xxl,
      img_big_1,
      img_big_2,
      img_big_3,
      img_big_4,
      img_small_1,
      img_small_2,
    } = req.body;

    // Verificar si la colección existe
    const coleccion_res = await Coleccion.findById(coleccion);
    if (!coleccion_res) {
      return res.status(404).json({ message: 'Colección no encontrada' });
    }

    const newProduct = new Product({
      nombre,
      categoria,
      coleccion_res, // Guardar la referencia de la colección
      descripcion,
      precio,
      cant_s,
      cant_m,
      cant_l,
      cant_xl,
      cant_xxl,
      img_big_1,
      img_big_2,
      img_big_3,
      img_big_4,
      img_small_1,
      img_small_2,
    });

    const savedProduct = await newProduct.save();
    res.json(savedProduct);
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'Something went wrong', error: error.message });
  }
};
export const getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product)
      return res.status(404).json({ message: 'Producto no encontrado' });

    // Obtener los descuentos actuales para este producto
    const discounts = await Discount.find({
      start_date: { $lte: new Date() },
      end_date: { $gte: new Date() },
      active: true,
      product_id: product._id,
    });

    if (discounts.length > 0) {
      const discount = discounts[0];
      const discountAmount =
        product.precio * (discount.discount_percentage / 100);

      // Crear la respuesta con los datos del producto y el descuento
      const productWithDiscount = {
        ...product.toObject(), // Convertir el documento de Mongoose a un objeto plano
        precio_con_descuento: product.precio - discountAmount,
        discount: {
          id: discount._id,
          discount_percentage: discount.discount_percentage,
          start_date: discount.start_date,
          end_date: discount.end_date,
        },
      };

      return res.json(productWithDiscount);
    } else {
      // Si no hay descuento, retornar solo el producto
      return res.json(product);
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'Algo salió mal', error: error.message });
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
    try {
      // Usar findByIdAndUpdate para modificar solo el stock y evitar problemas de validación
      const updatedProduct = await Product.findByIdAndUpdate(
        id,
        { $inc: { [`cant_${talle.toLowerCase()}`]: -quantity } },
        { new: true, runValidators: false }
      );

      if (!updatedProduct) {
        return res.status(404).json({ message: 'Producto no encontrado' });
      }

      res.json(updatedProduct);
    } catch (error) {
      console.error('Error al actualizar el stock:', error);
      return res.status(500).json({ message: 'Algo salió mal' });
    }
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

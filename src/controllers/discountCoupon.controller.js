import Discount from '../models/descuento.model.js';
import Coupon from '../models/cupones.model.js';

// Controladores para descuentos
export const getDiscounts = async (req, res) => {
  try {
    const discounts = await Discount.find().populate('product_id');
    res.json(discounts);
  } catch (error) {
    res.status(500).json({
      message: 'Error al obtener los descuentos',
      error: error.message,
    });
  }
};

export const getDiscount = async (req, res) => {
  const { producId } = req.params;
  try {
    const discount = await Discount.find({ product_id: producId }).populate(
      'product_id'
    );
    if (discount) {
      res.json(discount);
    } else {
      res.status(404).json({ message: 'Descuento no encontrado' });
    }
  } catch (error) {
    res.status(500).json({
      message: 'Error al obtener el descuento',
      error: error.message,
    });
  }
};

export const createDiscount = async (req, res) => {
  try {
    const { product_id, discount_percentage, start_date, end_date } = req.body;
    const newDiscount = new Discount({
      product_id,
      discount_percentage,
      start_date,
      end_date,
    });

    const savedDiscount = await newDiscount.save();
    res.json(savedDiscount);
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error al crear el descuento', error: error.message });
  }
};

export const updateDiscount = async (req, res) => {
  try {
    const discountId = req.params.id;
    const update = req.body;
    const updatedDiscount = await Discount.findByIdAndUpdate(
      discountId,
      update,
      { new: true }
    );
    if (!updatedDiscount) {
      return res.status(404).json({ message: 'Descuento no encontrado' });
    }
    res.json(updatedDiscount);
  } catch (error) {
    res.status(500).json({
      message: 'Error al actualizar el descuento',
      error: error.message,
    });
  }
};

export const deleteDiscount = async (req, res) => {
  try {
    const discountId = req.params.id;
    const deletedDiscount = await Discount.findByIdAndDelete(discountId);
    if (!deletedDiscount) {
      return res.status(404).json({ message: 'Descuento no encontrado' });
    }
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({
      message: 'Error al eliminar el descuento',
      error: error.message,
    });
  }
};

// Controladores para cupones
export const getCoupons = async (req, res) => {
  try {
    const coupons = await Coupon.find();
    res.json(coupons);
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error al obtener cupones', error: error.message });
  }
};

export const getCouponByCode = async (req, res) => {
  const { code } = req.params;
  try {
    const coupon = await Coupon.findOne({ code });
    if (coupon) {
      res.json(coupon);
    } else {
      res.status(404).json({ message: 'Cupón no encontrado' });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error al buscar el cupón', error: error.message });
  }
};

export const createCoupon = async (req, res) => {
  try {
    const newCoupon = new Coupon(req.body);
    const savedCoupon = await newCoupon.save();
    res.json(savedCoupon);
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error al crear cupón', error: error.message });
  }
};

export const updateCoupon = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedCoupon = await Coupon.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updatedCoupon) {
      return res.status(404).json({ message: 'Cupón no encontrado' });
    }
    res.json(updatedCoupon);
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error al actualizar cupón', error: error.message });
  }
};

export const deleteCoupon = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedCoupon = await Coupon.findByIdAndDelete(id);
    if (!deletedCoupon) {
      return res.status(404).json({ message: 'Cupón no encontrado' });
    }
    res.json({ message: 'Cupón eliminado' });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error al eliminar cupón', error: error.message });
  }
};

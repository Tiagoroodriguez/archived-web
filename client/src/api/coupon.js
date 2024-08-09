import axios from './axios';

export const getCouponRequest = async (couponCode) => {
  return await axios.get(`/coupon/${couponCode}`);
};

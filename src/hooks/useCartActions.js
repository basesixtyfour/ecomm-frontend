import { useDispatch, useSelector } from "react-redux";
import {
  addCartItemAsync,
  updateCartItemAsync,
  deleteCartItemAsync,
  addLocalItem,
  updateLocalItem,
  removeLocalItem,
} from "../context/cartSlice";

export const useCartActions = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const addItem = async (product, quantity = 1) => {
    if (isAuthenticated) {
      return dispatch(addCartItemAsync({ productId: product.id, quantity })).unwrap();
    }
    dispatch(addLocalItem({ product, quantity }));
  };

  const updateItem = async ({ itemId, productId, quantity }) => {
    if (isAuthenticated) {
      return dispatch(updateCartItemAsync({ itemId, quantity })).unwrap();
    }
    dispatch(updateLocalItem({ productId, quantity }));
  };

  const removeItem = async ({ itemId, productId }) => {
    if (isAuthenticated) {
      return dispatch(deleteCartItemAsync(itemId)).unwrap();
    }
    dispatch(removeLocalItem({ productId }));
  };

  return { addItem, updateItem, removeItem, isAuthenticated };
};

import axios from "../helpers/axios";
import { productConstants } from "./constants";

// new action
const getProducts = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: productConstants.GET_ALL_PRODUCTS_REQUEST });
      const res = await axios.get(`/products`);
      if (res.status === 200) {
        console.log(res.data)
        const { products } = res.data;
        dispatch({
          type: productConstants.GET_ALL_PRODUCTS_SUCCESS,
          payload: { products },
        });
      } else {
        dispatch({ type: productConstants.GET_ALL_PRODUCTS_FAILURE });
      }
    } catch (error) {
      console.log(error);
    }
  };
};

// modified actrion
export const addProduct = (form) => {
  return async (dispatch) => {
    try {
      dispatch({ type: productConstants.ADD_PRODUCT_REQUEST });
      const res = await axios.post(`products/`, form);
      if (res.status === 201) {
        console.log("here is form", form)
        dispatch({ type: productConstants.ADD_PRODUCT_SUCCESS });
        dispatch(getProducts());
      } else {
        dispatch({ type: productConstants.ADD_PRODUCT_FAILURE });
      }
    } catch (error) {
      console.log(error);
    }
  };
};

// New action for editing a product
export const updateProductById = (productId, form) => {
  return async (dispatch) => {
    try {
      dispatch({ type: productConstants.EDIT_PRODUCT_REQUEST });
      const res = await axios.put(`products/${productId}`, form);
      if (res.status === 200) {
        dispatch({ type: productConstants.EDIT_PRODUCT_SUCCESS });
        dispatch(getProducts()); // Refresh the product list
      } else {
        dispatch({ type: productConstants.EDIT_PRODUCT_FAILURE });
      }
    } catch (error) {
      console.log(error);
    }
  };
};


// new action
export const deleteProductById = (productId) => {
  return async (dispatch) => {
    try {
      const res = await axios.delete(`products/${productId}`);
      dispatch({ type: productConstants.DELETE_PRODUCT_BY_ID_REQUEST });
      if (res.status === 202) {
        dispatch({ type: productConstants.DELETE_PRODUCT_BY_ID_SUCCESS });
        dispatch(getProducts());
      } else {
        const { error } = res.data;
        dispatch({
          type: productConstants.DELETE_PRODUCT_BY_ID_FAILURE,
          payload: {
            error,
          },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export {
  getProducts
}
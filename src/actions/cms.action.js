import axios from "../helpers/axios";
import { CmsConstant } from "./constants";

const getAllCarousel = () => {
    return async dispatch => {
        dispatch({ type: CmsConstant.GET_CAROUSEL_REQUEST });
        console.log("Fetching categories...");
        const res = await axios.get(`/carousel`);
        console.log("Response data:", res.data); // Log the response data
        if (res.status === 200) {
            const  carousels   = res.data;
            dispatch({
                type: CmsConstant.GET_CAROUSEL_SUCCESS,
                payload: { carousels }
            });
        } else {
            dispatch({
                type: CmsConstant.GET_CAROUSEL_FAILURE,
                payload: { error: res.data.error }
            });
        }
    }
}


// modified actrion
export const addCarousel = (formData) => {
    return async (dispatch) => {
      try {
        dispatch({ type: CmsConstant.ADD_CAROUSEL_REQUEST });
        const res = await axios.post(`/carousel`, formData);
        if (res.status === 201) {
          dispatch({ type: CmsConstant.ADD_CAROUSEL_SUCCESS });
          dispatch(getAllCarousel());
        } else {
          dispatch({ type: CmsConstant.ADD_CAROUSEL_FAILURE });
        }
      } catch (error) {
        console.log(error);
      }
    };
  };

// New action for editing a product
export const updateCarouselById = (carouselId, form) => {
  return async (dispatch) => {
    try {
      dispatch({ type: CmsConstant.UPDATE_CAROUSEL_REQUEST });
      const res = await axios.put(`carousel/${carouselId}`, form);
      if (res.status === 200) {
        dispatch({ type: CmsConstant.UPDATE_CAROUSEL_SUCCESS });
        dispatch(getAllCarousel()); // Refresh the product list
      } else {
        dispatch({ type: CmsConstant.UPDATE_CAROUSEL_FAILURE });
      }
    } catch (error) {
      console.log(error);
    }
  };
};

  export const deleteCarouselById = (carouselId) => {
    return async (dispatch) => {
      try {
        const res = await axios.delete(`carousel/${carouselId}`);
        dispatch({ type: CmsConstant.DELETE_CAROUSEL_REQUEST });
        if (res.status === 202) {
          dispatch({ type: CmsConstant.DELETE_CAROUSEL_SUCCESS });
          dispatch(getAllCarousel());
        } else {
          const { error } = res.data;
          dispatch({
            type: CmsConstant.DELETE_CAROUSEL_FAILURE,
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
    getAllCarousel
  }
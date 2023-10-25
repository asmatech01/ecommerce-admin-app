import axios from "../helpers/axios";
import { TacConstants } from "./constants";

const getTerms = () => {
    return async (dispatch) => {
      try {
        dispatch({ type: TacConstants.GET_TERMS_REQUEST });
        const res = await axios.get(`/conditions`);
        if (res.status === 200) {
          console.log(res.data)
          const { content } = res.data;
          dispatch({
            type: TacConstants.GET_TERMS_SUCCESS,
            payload: { content },
          });
        } else {
          dispatch({ type: TacConstants.GET_ALL_PRODUCTS_FAILURE });
        }
      } catch (error) {
        console.log(error);
      }
    };
  };

  export {
    getTerms
  }
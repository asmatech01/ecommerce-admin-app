import { CmsConstant } from "../actions/constants";

const initState = {
  carousels: [],
  loading: false,
  error: null,
};


export default (state = initState, action) => {
  switch (action.type) {
    case CmsConstant.GET_CAROUSEL_SUCCESS:
      state = {
        ...state,
        carousels: action.payload.carousels,
      };
      break;
    case CmsConstant.ADD_CAROUSEL_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case CmsConstant.ADD_CAROUSEL_SUCCESS:
      const Carousels = action.payload.Carousels;
    //   const updatedCategories = buildNewCategories(
    //     category.parentId,
    //     state.categories,
    //     category
    //   );
      state = {
        ...state,
       Carousels: Carousels,
        loading: false,
      };
      break;
    // case categoryConstansts.ADD_NEW_CATEGORY_FAILURE:
    //   state = {
    //     ...state,
    //     loading: false,
    //     error: action.payload.error,
    //   };
    //   break;
    // case categoryConstansts.UPDATE_CATEGORIES_REQUEST:
    //   state = {
    //     ...state,
    //     loading: true,
    //   };
    //   break;
    // case categoryConstansts.UPDATE_CATEGORIES_SUCCESS:
    //   state = {
    //     ...state,
    //     loading: false,
    //   };
    //   break;
    // case categoryConstansts.UPDATE_CATEGORIES_FAILURE:
    //   state = {
    //     ...state,
    //     error: action.payload.error,
    //     loading: false,
    //   };
    //   break;
    // case categoryConstansts.DELETE_CATEGORIES_REQUEST:
    //   state = {
    //     ...state,
    //     loading: true,
    //   };
    //   break;
    // case categoryConstansts.DELETE_CATEGORIES_SUCCESS:
    //   state = {
    //     ...state,
    //     loading: false,
    //   };
    //   break;
    // case categoryConstansts.DELETE_CATEGORIES_FAILURE:
    //   state = {
    //     ...state,
    //     loading: false,
    //     error: action.payload.error,
    //   };
    //   break;
  }

  return state;
};

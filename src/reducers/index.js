import authReducer from './auth.reducer';
import userReducer from './user.reducer';
import productReducer from './product.reducer';
import categoryReducer from './category.reducer';
import orderReducer from './order.reducer';
import { combineReducers } from 'redux';
import carouselReducer from './carousel.reducer';
import termsReducer from './terms.reducer';

const rootReducer = combineReducers({
    auth: authReducer,
    user: userReducer,
    category: categoryReducer,
    product: productReducer,
    order: orderReducer,
    carousel: carouselReducer,
    terms: termsReducer
});

export default rootReducer;
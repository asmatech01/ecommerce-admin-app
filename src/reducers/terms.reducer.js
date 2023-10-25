import { TacConstants } from "../actions/constants";

const initialState = {
    content: ""
};

export default (state = initialState, action) => {
    switch(action.type){
        case TacConstants.GET_TERMS_SUCCESS:
            state = {
                ...state,
                content: action.payload.content
            }
            break;
    }

    return state;
}
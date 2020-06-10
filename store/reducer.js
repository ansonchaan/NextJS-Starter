import { print } from '../globalFunc';
import { HYDRATE } from 'next-redux-wrapper';

export const initialState = {
    language: 'en',
    count: 0,
    page:''
}

const reducer = (state = initialState, action) => {
    switch(action.type){
        case HYDRATE:
            // Attention! This will overwrite client state! Real apps should use proper reconciliation.
            return {...state, ...action.payload};
        case 'UPDATE_LANGUAGE':
            print(action.type, 'green', action.language)
            return { ...state, language: action.language }
        case 'ADD_COUNT':
            print(action.type, 'green', state.count + 1)
            return { ...state, count: state.count + 1 }
        case 'UPDATE_PAGE':
            print(action.type, 'green', action.page)
            return { ...state, page:action.page }
        default:
            return state;
    }
}

export default reducer;
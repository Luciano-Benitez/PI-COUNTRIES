import {GET_COUNTRIES, ORDER_BY_NAME, ORDER_BY_CONTINENT,
        GET_COUNTRY_NAME, GET_COUNTRY_DETAIL, POST_CREATE, ORDER_BY_ACTIVITY} from '../actions/types'

 const initialState = {
    countries: [],
    allCountries: [],
    detail: [],
 };

const reducer = (state = initialState, {type, payload}) => {
    switch(type){
        case GET_COUNTRIES:
            return {
                ...state,
                countries: payload,
                allCountries: payload
            };

            case POST_CREATE:
                return {
                    ...state
                };

            case GET_COUNTRY_NAME:
                return {
                    ...state,
                    countries: payload
                };

                case GET_COUNTRY_DETAIL:
                    return {
                        ...state,
                        detail: payload
                    };

                case ORDER_BY_CONTINENT:
                const all = state.allCountries;
                const orderByContinent = payload === 'all' ? all : all.filter(e => e.continente === payload);
                    return {
                        ...state,
                        countries: orderByContinent
                    };

            case ORDER_BY_NAME:
            const orderbyName = payload === 'asc' ?
            state.countries.sort((a,b) => a.name.localeCompare(b.name)) :
            state.countries.sort((a,b) => b.name.localeCompare(a.name));
                return{
                    ...state,
                    countries:  orderbyName
                };

            case ORDER_BY_ACTIVITY:
                const allCountries = state.allCountries
                const result = payload === 'act' ? allCountries.filter(e => e.activities[0]):null

                return {
                    ...state,
                    countries: result
                };

        default:
            return state
    }
};

export default reducer;
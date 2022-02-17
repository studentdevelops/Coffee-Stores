import { ACTION_TYPES } from "./constains"

export const initialState = {
    LatLong: "",
    CoffeeStores: []
}

export const storeReducer = (state = initialState, action) => {
    switch (action.type) {
        case ACTION_TYPES.SET_LAT_LONG: {
            return Object.assign({}, state, { LatLong: action.payload.LatLong })
        }
        case ACTION_TYPES.SET_COFFEE_STORES: {
            return Object.assign({}, state, { CoffeeStores: action.payload.CoffeeStores })
        }
        default: return state;
    }
}
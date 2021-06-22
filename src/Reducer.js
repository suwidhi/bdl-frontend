const Reducer = (state, action) => {
    switch (action.type) {
        case 'SET_TOKEN':
            return {
                ...state,
                token: action.payload
            };
        case 'SET_USER':
            return {
                ...state,
                user: action.payload
            };
        case 'RESET':
            return {
                token: '',
                user: {},
                cart: []
            }

        case 'ADD_CART':
            return {
                ...state,
                cart: [...state.cart, action.payload]
            }
        case 'REM_CART':
            // nothing happen don't know what to do yet
            return {
                ...state,
                cart: [...state.cart.filter(id => id !== action.payload)]
            }
        default:
            return state;
    }
};

export default Reducer;
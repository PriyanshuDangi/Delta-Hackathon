const initialState = {
    position: [0, 0, -20]
}

export default function appReducer(state = initialState, action) {
    switch (action.type) {
        case 'update-user-position':
            return {
                ...state,
                position: action.position
            }

        default:
            return state;
    }
}
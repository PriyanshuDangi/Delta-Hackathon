const p = [Math.floor(Math.random() * 10), Math.floor(Math.random() * 10), -1 - Math.floor(Math.random() * 10)];

console.log(p);

const initialState = {
    position: p,
    boxes: {},
};

export default function appReducer(state = initialState, action) {
    switch (action.type) {
        case 'update-user-position':
            return {
                ...state,
                position: action.position,
            };
        case 'update-boxes-position':
            return {
                ...state,
                boxes: action.boxes,
            };
        default:
            return state;
    }
}

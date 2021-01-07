import {createStore} from 'redux';
import appReducer from './reducers';

// export default configureStore({
//     reducer: {
//         counter: appReducer,
//     },
// });

export default createStore(appReducer);

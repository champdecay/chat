import { configureStore } from '@reduxjs/toolkit'
import chatReducer from './chatSlice'

export default configureStore({
    reducer: {
        chat: chatReducer
    },
    devTools: window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
})
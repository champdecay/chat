import { createSlice } from '@reduxjs/toolkit';

export const chatSlice = createSlice({
    name: 'chat',
    initialState: {
        messages: [],
        users: [],
    },
    reducers: {
        addMessage: (state, action) => {
            state.messages.push(action.payload);
        },
        addUser: (state, action) => {
            state.users.push(action.payload);
        }
    }
});

export const { addMessage, addUser } = chatSlice.actions;
export default chatSlice.reducer;
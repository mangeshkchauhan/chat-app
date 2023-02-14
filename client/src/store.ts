import { createSlice, configureStore } from '@reduxjs/toolkit';

const initialState = {
  messages: [],
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    addMessage: (state: any, action) => {
      state.messages.push(action.payload);
    },
  },
});

export const store = configureStore({
  reducer: {
    chats: chatSlice.reducer,
  },
});
export const { addMessage } = chatSlice.actions;

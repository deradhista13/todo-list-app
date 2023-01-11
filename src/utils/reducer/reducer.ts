import { createSlice } from "@reduxjs/toolkit";

import { TodoType } from "../types/todos";

interface StateType {
  todos: TodoType[];
  created_at: boolean;
}

const initialState: StateType = {
  todos: [],
  created_at: true,
};

const sliceState = createSlice({
  name: "state",

  initialState: initialState,

  reducers: {
    setTodos: (state, action) => {
      state.todos = action.payload;
    },
    setcreated_at: (state, action) => {
      state.created_at = action.payload;
    },
  },
});

const reducer = {
  state: sliceState.reducer,
};

export const { setTodos, setcreated_at } = sliceState.actions;
export default reducer;

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initialStateType, TodoState  } from "../constants/type";
import { RootState } from "./store";


const initialState : initialStateType = {
    data: [],
}
export const todoSlice = createSlice({
    name: "todo",
    initialState,
    reducers: {
        addNewTodo: (state, action: PayloadAction<TodoState | undefined>) => {
            if(action.payload === undefined) {
                return;
            }
            state.data.push(action.payload);
        },
        updateTodo: (state, action: PayloadAction<TodoState>) => {
            const {id, isCompleted, name, level} = action.payload;

            state.data = state.data.map((todo) =>
                todo.name === name ? {...todo, isCompleted, id, level} : todo,
            )
        },
        deleteTodo: (state, action: PayloadAction<{id: string}>) => {
            state.data = state.data.filter((todo) => todo.id !== action.payload.id);
        },
        initTodo: (state, action: PayloadAction<TodoState[]>) => {
            state.data = action.payload;
            // action.payload.forEach((todo) => {
            //     state.data.push(todo);
            // })
        },
    }
})

export const { addNewTodo, updateTodo, deleteTodo, initTodo } = todoSlice.actions;

export const selectBookList = (state: RootState) => state.todo.data;

export default todoSlice.reducer


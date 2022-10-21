import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initialStateType, TodoState  } from "../constants/type";
import { RootState } from "./store";

const initialState : initialStateType = {
    todoList: [],
}
export const todoSlice = createSlice({
    name: "todo",
    initialState,
    reducers: {
        addNewTodo: (state, action: PayloadAction<TodoState>) => {
            state.todoList.push(action.payload);
        },
        updateTodo: (state, action: PayloadAction<TodoState>) => {
            const {id, isCompleted, name, level} = action.payload;

            state.todoList = state.todoList.map((todo) =>
                todo.name === name ? {...todo, isCompleted, id, level} : todo,
            )
        },
        deleteTodo: (state, action: PayloadAction<{id: string}>) => {
            state.todoList = state.todoList.filter((todo) => todo.id !== action.payload.id);
        },
    }
})

export const { addNewTodo, updateTodo, deleteTodo } = todoSlice.actions;

export const selectBookList = (state: RootState) => state.todo.todoList;

export default todoSlice.reducer


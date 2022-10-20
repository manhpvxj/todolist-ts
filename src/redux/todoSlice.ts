import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initialStateType, TodoState  } from "../constants/type";
import { RootState } from "./store";

const initialState : initialStateType = {
    todoList: [{
        key: "1",
        isCompleted: false,
        name: "learn HTML + CSS",
        level: "easy",
    },
    {
        key: "2",
        isCompleted: true,
        name: "learn JS",
        level: "easy",
    },
    {
        key: "3",
        isCompleted: true,
        name: "learn ReactJS",
        level: "medium",
    },
    {
        key: "4",
        isCompleted: true,
        name: "learn Typescript",
        level: "hard",
    },],
}
export const todoSlice = createSlice({
    name: "todo",
    initialState,
    reducers: {
        addNewTodo: (state, action: PayloadAction<TodoState>) => {
            state.todoList.push(action.payload);
        },
        updateTodo: (state, action: PayloadAction<TodoState>) => {
            const {key, isCompleted, name, level} = action.payload;

            state.todoList = state.todoList.map((todo) =>
                todo.name === name ? {...todo, isCompleted, key, level} : todo,
            )
        },
        deleteTodo: (state, action: PayloadAction<{id: string}>) => {
            state.todoList = state.todoList.filter((todo) => todo.key !== action.payload.id);
        },
    }
})

export const { addNewTodo, updateTodo, deleteTodo } = todoSlice.actions;

export const selectBookList = (state: RootState) => state.todo.todoList;

export default todoSlice.reducer



export type initialStateType = {
    todoList: TodoState[];
}

export type TodoState = {
    key : string,
    isCompleted: boolean,
    name: string,
    level: "easy" | "medium" | "hard" | undefined,
   };
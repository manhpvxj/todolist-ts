


export type initialStateType = {
    data: TodoState[];
}

export type TodoState = {
    id : string,
    isCompleted: boolean,
    name: string,
    level: "easy" | "medium" | "hard" | undefined,
   };
import axiosClient from "../api/axiosClient";
import { TodoState } from "../constants/type";

export const getList = () => {
        return axiosClient.get<unknown, TodoState[]>('/todolist');
    }
  

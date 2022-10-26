import { useQuery } from 'react-query';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from "../redux/store";
import { getList } from "../services/TodoListService";


export const useGetList = () => {
    return useQuery("listtodo", () => getList(), {
        cacheTime: Infinity,
        refetchOnWindowFocus: false,
        staleTime: Infinity,
    })
}

//useDispatch hook with types.
export const useAppDispatch = () => useDispatch<AppDispatch>();
//useSelector hook with types
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
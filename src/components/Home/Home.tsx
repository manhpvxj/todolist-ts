import { Button } from "antd";
import { Radio, RadioGroup, FormControlLabel, FormControl, FormLabel } from '@mui/material';
import { useEffect, useState } from "react";
import { TodoState } from "../../constants/type";
import { useAppDispatch, useAppSelector, useGetList } from "../../hooks/hook";
import { addNewTodo, deleteTodo, initTodo, updateTodo } from "../../redux/todoSlice";
import { v4 as uuidv4} from "uuid";
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import DeleteIcon from '@material-ui/icons/Delete';
import { getList } from "../../services/TodoListService";

const Home = () => {
    const column: GridColDef[] = [
      { field: 'name', headerName: 'Name', width: 300, renderCell: (params) => <p className="cursor-pointer" onClick={() => handleClickName(params.row)}>{params.value}</p> },
      { field: 'isCompleted', headerName: 'Status', width: 150, renderCell: (params) => params.value ? "completed" : "doing"},
      { field: 'level', headerName: 'Level', width: 150},
      { field: 'id', headerName: 'Action', width: 150, renderCell: (params) => <div className="cursor-pointer" onClick={() => handleDeleteTodo(params.value)}><DeleteIcon/></div>}
  ]
        const dispatch = useAppDispatch();

        const todoList = useAppSelector((state) => state.todo.data);

        //const data = getList();
        const {data, isLoading} = useGetList();

        useEffect(() => {
          if(data) {
            dispatch(initTodo(data))
          }
        },[isLoading])
        
        const [todoInfo, setTodoInfo]  = useState<TodoState>({
          id: "",
          isCompleted: false,
          name: "",
          level: undefined,
        });

        const [isDuplicate, setIsDuplicate] = useState<boolean>(false);


        const handleClickName = (name: TodoState) => {
          setTodoInfo(name);
        }
        const handleChangeLevel = (e : string) => {
          switch (e) {
            case "easy":
              return "easy"
            case "medium":
              return "medium"
            case "hard":  
              return "hard"     
            default:
              return undefined;
          }
        }
        const handleAddTodo = () => {
            if(todoInfo.name === "" || todoInfo.level === undefined){
              window.alert("Add a todo name")
              clearInput();
              return;
            }
            for(const e of todoList) {
              if(e.name === todoInfo.name) {
                setIsDuplicate(true);
              }
            }  
            if(isDuplicate === true)
            {
              handleEditTodo();
              return;
            }                     
            dispatch(addNewTodo({...todoInfo, id: uuidv4()}));
            clearInput();
          }
        const handleEditTodo = () => {
          dispatch(updateTodo(todoInfo));
          clearInput();
        }

        const handleDeleteTodo = (id: string) => {
          dispatch(deleteTodo({id: id}))
        }

        const clearInput = () => {
          setTodoInfo({
            id: "",
            name: "",
            level: undefined,
            isCompleted: false,
          })
        }

    return (
      <div>
        <div className="flex flex-col items-center justify-center">
          <h2 className=" text-3xl font-bold text-center mt-10">To do list</h2>
          <div className="mt-10">
            <label>Todo name :</label>
            <input
              value={todoInfo.name}
              placeholder="Name"
              onChange={(e) => setTodoInfo({...todoInfo, name : e.target.value})}
              className="text-center mt-2"
            ></input>
          </div>

          <FormControl className="mt-5 flex">
            <FormLabel id="status">Status</FormLabel>
            <RadioGroup
              aria-labelledby="status"
              name="status"
              value={todoInfo.isCompleted}
              onChange={(e) => {
                setTodoInfo({
                  ...todoInfo,
                  isCompleted: e.target.value === "true",
                });
              }}
            >
              <FormControlLabel
                value={true}
                control={<Radio />}
                label="Completed"
              />
              <FormControlLabel
                value={false}
                control={<Radio />}
                label="Doing"
              />
            </RadioGroup>
          </FormControl>

          <FormControl className="mt-5 flex">
            <FormLabel id="level">Level</FormLabel>
            <RadioGroup
              aria-labelledby="level"
              name="level"
              value={todoInfo.level ? todoInfo.level : "easy"}
              onChange={(e) =>
                setTodoInfo({...todoInfo, level: handleChangeLevel(e.target.value)})}     
            >
              <FormControlLabel 
                value={"easy"}
                control={<Radio />} 
                label="easy" 
              />
              <FormControlLabel
                value={"medium"}
                control={<Radio />}
                label="medium"
              />
              <FormControlLabel 
                value={"hard"} 
                control={<Radio />} 
                label="hard" 
              />
            </RadioGroup>
          </FormControl>
          {/* <RadioGroup
            onChange={(e) => {
              setTodoInfo({ ...todoInfo, isCompleted: e.target.value });
            }}
            className=" items-center justify-center flex py-4"
          >
            <Radio value={false} className="px-2">
              {"Doing"}
            </Radio>
            <Radio value={true} className="px-2">
              {"Completed"}
            </Radio>
          </RadioGroup> */}
          {/* <Radio.Group
            onChange={(e) =>
              setTodoInfo({ ...todoInfo, level: e.target.value })
            }
            className=" items-center justify-center flex py-4"
          >
            <Radio
              value="easy"
              checked={todoInfo.name === "easy" ?? false}
              className="px-2"
            >
              {" "}
              easy
            </Radio>
            <Radio
              value="medium"
              checked={todoInfo.name === "medium" ?? false}
              className="px-2"
            >
              {" "}
              medium
            </Radio>
            <Radio
              value="hard"
              checked={todoInfo.name === "hard" ?? false}
              className="px-2"
            >
              {" "}
              hard
            </Radio>
          </Radio.Group> */}

          <Button
            type="primary"
            onClick={handleAddTodo}
            className="w-auto p-2 mb-4 text-white bg-blue-500 rounded-md"
          >
            Add a todo
          </Button>
        </div>
        <div>
          <div style={{ height: 350, width: "100%" }}>
            <DataGrid rows={todoList} columns={column}></DataGrid>
          </div>
        </div>
      </div>
    );
}
 
export default Home;
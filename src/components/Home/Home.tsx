import { Col, Table, Checkbox, Button, Tag, Radio } from "antd";
import type { ColumnsType } from 'antd/es/table';
import { useState } from "react";
import { TodoState } from "../../constants/type";
import { useAppDispatch, useAppSelector } from "../../hooks/hook";
import { addNewTodo, updateTodo } from "../../redux/todoSlice";
import { v4 as uuidv4} from "uuid";

const Home = () => {

    const columns: ColumnsType<TodoState> = [
        {
          title: 'Name',
          dataIndex: 'name',
          key: 'name',
          render: data => <p className=" font-bold">{data}</p>
        },
        {
          title: 'Status',
          dataIndex: 'isCompleted',
          key: 'isCompleted',
          render: data => {
            
            return (<Checkbox 
            defaultChecked={data} 
            className="px-4 font-bold"
            onChange={(e) => !data}
            >{data ? "Completed" : "Doing"}</Checkbox>)}
        },
        {
          title: 'Level',
          dataIndex: 'level',
          key: 'level',
          render: data => {switch(data) {
            case "easy": 
              return <Tag color="green">{data}</Tag>
            case "medium":
              return <Tag color="gold">{data}</Tag>
            case "hard":
              return <Tag color="red">{data}</Tag>
            default:
              return <Tag color="purple">unknown</Tag>
          }}
        },
    ]
        const dispatch = useAppDispatch();
        const todoList = useAppSelector((state) => state.todo.todoList);
        const [todoInfo, setTodoInfo]  = useState<TodoState>({
          key: "",
          isCompleted: false,
          name: "",
          level: undefined,
        });
        const handleAddTodo = () => {
          console.log(todoInfo);
            if(todoInfo.name !== "" && todoInfo.level !== undefined){
            for(const e of todoList) {
              if(e.name !== todoInfo.name) {
                dispatch(addNewTodo({...todoInfo, key: uuidv4()}));
                clearInput();
                return;
              }
              else {
                handleEditTodo();
                clearInput();
                return;
              }
            }
          }
            else {
              clearInput();
            }
          }
        const handleEditTodo = () => {
          dispatch(updateTodo(todoInfo));
          clearInput();
        }
        const clearInput = () => {
          setTodoInfo({
            key: "",
            name: "",
            level: undefined,
            isCompleted: false,
          })
        }
    return ( 
        <div>
            <Col className=" text-3xl font-bold text-center mt-10">To do list</Col>
            <input 
              value={todoInfo.name} 
              placeholder="Name" 
              onChange={(e) => {setTodoInfo({...todoInfo, name: e.target.value })}}
              className="ml-[40%] mt-10 "
              ></input>
            <Button type="primary" onClick={handleAddTodo} className="ml-2 p-2 bg-blue-500 rounded-md">Add a todo</Button>
            
            <Radio.Group onChange={(e) => setTodoInfo({...todoInfo, level: e.target.value})} className=" items-center justify-center flex flex-col">
              <Radio value="easy">easy</Radio>
              <Radio value="medium">medium</Radio>
              <Radio value="hard">hard</Radio>
            </Radio.Group>

            <Table 
                dataSource={todoList}
                columns={columns}
                size="middle"
                bordered
                className="border-zinc-800"
            />

            
        </div>
     );
}
 
export default Home;
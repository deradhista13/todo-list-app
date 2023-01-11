import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

import axios from "axios";

import Layout from "../components/Layout";
import Button from "../components/Button";
import { Input } from "../components/Input";
import { TodoType } from "../utils/types/todos";
import { setTodos } from "../utils/reducer/reducer";

const Homepage = () => {
  const dispatch = useDispatch();
  const [todos, setTodos] = useState<TodoType[]>([]);
  const [inputTask, setInputTask] = useState<string>("");

  useEffect(() => {
    fetchData();
  }, []);

  function fetchData() {
    axios
      .get("https://api.todoist.com/rest/v2/tasks", {
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_TODO_API}`,
        },
      })
      .then((res) => {
        setTodos(res.data);
      })
      .catch((err) => {
        alert(err.toString());
      });
  }

  function handleAddTask() {
    const body = {
      content: inputTask,
    };
    axios
      .post("https://api.todoist.com/rest/v2/tasks", body, {
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_TODO_API}`,
        },
      })
      .then((res) => {
        alert("Berhasil menambahkan todo");
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => fetchData());
  }

  function handleEditTask(todo: TodoType) {
    const body = {
      content: inputTask,
    };
    axios
      .post("https://api.todoist.com/rest/v2/tasks", body, {
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_TODO_API}`,
        },
      })
      .then((res) => {
        alert("Berhasil menambahkan todo");
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => fetchData());
  }

  function handleDeleteTask(todo: TodoType) {
    let dupeTodos: TodoType[] = todos.slice();
    const filterTodo = dupeTodos.filter((item) => item.id !== todo.id);
    localStorage.setItem("FavMovie", JSON.stringify(filterTodo));
    dispatch(setTodos(filterTodo));
    alert(`Delete ${todo.content} from favorite list`);
  }

  return (
    <Layout>
      <div className="rounded-2xl w-full flex flex-col p-6 bg-white dark:bg-gray-500 shadow-xl mb-3 font-sans font-semibold">
        <Input
          id="input-task"
          label="Insert a new task"
          value={inputTask}
          onChange={(e) => setInputTask(e.target.value)}
        />
        <Button label="Add Task" onClick={() => handleAddTask()} />
      </div>
      {todos.map((todo) => (
        <div
          key={todo.id}
          className="rounded-2xl p-6 mb-2 w-full bg-slate-400 gap-2 flex flex-col font-sans font-semibold"
        >
          <p className="break-words">{todo.content}</p>
          <Button label="Edit" onClick={() => handleEditTask(todo)} />
          <Button label="Hapus" onClick={() => handleDeleteTask(todo)} />
        </div>
      ))}
    </Layout>
  );
};

export default Homepage;
